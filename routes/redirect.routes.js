const { Router } = require('express')
const Product = require('../models/Product')
const router = Router()


router.get('/:code', async (req, res) => {
  try {

    const product = await Product.findOne({ code: req.params.code })

    if (product) {
      product.clicks++
      await product.save()
      return res.redirect(product.from)
    }

    res.status(404).json('Ссылка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
