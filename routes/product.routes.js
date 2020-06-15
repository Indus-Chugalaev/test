const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Product = require('../models/Product')
const auth = require('../middleware/auth.middleware')
const router = Router()


// admin or root
router.post('/generateproduct', auth, async (req, res) => {

  // if (req.user.userRole === 'admin' || req.user.userRole === 'root') {
    try {

      const { productName, productPrice, productCounts, productCost, productImage } = req.body

      const productCandidate = await Product.findOne({ productName })

      if (productCandidate) {
        return res.status(400).json({ message: 'Такой товар уже существует' })
      }

      const product = new Product({
        productName, productPrice, productCounts, productCost, productImage, owner: req.user.userId
      })

      await product.save()

      res.status(201).json({ product })
    }

    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  // } else {
  //   res.status(500).json({ message: 'У вас нет прав доступа' })
  // }
}
)


// all users
router.get('/', auth, async (req, res) => {

  try {
    const products = await Product.find({})
    res.json(products)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }


})

router.get('/:id', auth, async (req, res) => {

  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }

})

module.exports = router
