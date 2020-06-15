const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Order = require('../models/Order')
const Cart = require('../models/Cart')

const auth = require('../middleware/auth.middleware')
const router = Router()


router.post('/generateorder', auth, async (req, res) => {


  try {

    const { orderCity, orderStreet, orderHome, orderFlat, orderComment, carts, cartsSum } = req.body

    const order = new Order({
      orderCity, orderStreet, orderHome, orderFlat, orderComment, carts, cartsSum, owner: req.user.userId
    })



    await order.save()
    // carts delete start

    let cartsArray = await Cart.find({ owner: req.user.userId })
    let cartsLength = cartsArray.length
    while (cartsLength > 0) {
      const cartDelete = await Cart.findOneAndDelete({ owner: req.user.userId })
      cartsLength--;

    }


    // carts delete end




    res.status(201).json({ message: 'Заказ оформлен', order })

  }

  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова. Проверьте введенные данные' })
  }
}

)


// all users
router.get('/', auth, async (req, res) => {

  try {
    const orders = await Order.find({})
    res.json(orders)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }


})

router.get('/:id', auth, async (req, res) => {

  try {
    const order = await Order.findById(req.params.id)
    res.json(order)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }

})

module.exports = router
