const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Cart = require('../models/Cart')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.post('/add', auth, async (req, res) => {

  try {

    const { cartId, cartName, cartPrice, cartCount } = req.body

    // поиск по товару в корзинах
    let cartFind = await Cart.find({ cartName })


    let ownerFilter = { owner: req.user.userId }

    // поиск в массиве по покупателю
    let own = cartFind.find(item => item.owner == ownerFilter.owner)

    if (own) {

      own.cartCount = +own.cartCount + 1
      own.cartSum = +own.cartCount * +own.cartPrice
      let plusCart = await Cart.findOneAndUpdate(
        { _id: own._id },
        { $set: { "cartCount": own.cartCount, "cartSum": own.cartSum } },
        { useFindAndModify: false }
      )

      res.status(201).json({ message: 'Количество товара увеличено' })

    } else {

      let cartSum = +cartPrice * 1
      const cart = new Cart({
        cartId,
        cartName,
        cartPrice,
        cartCount,
        cartSum: +cartPrice * 1,
        owner: req.user.userId
      })

      await cart.save()

      res.status(201).json({ message: 'Товар добавлен в корзину' })
    }

  }

  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}
)


router.post('/plus', auth, async (req, res) => {

  try {

    const { cartId, cartCount, cartPrice } = req.body


    let cartItem = await Cart.find({ _id: cartId })

    cartItem.cartCount = +cartCount + 1
    cartItem.cartSum = cartItem.cartCount * cartPrice

    let cartUpdate = await Cart.updateOne({ _id: cartId }, { $set: { "cartCount": cartItem.cartCount, "cartSum": cartItem.cartSum } })

    res.status(201).json({ message: 'Количество товара увеличено' })

  }

  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}
)

router.post('/minus', auth, async (req, res) => {

  try {

    const { cartId, cartCount, cartPrice } = req.body


    let cartItem = await Cart.find({ _id: cartId })

    cartItem.cartCount = +cartCount - 1

    if ((+cartCount - 1) < 1) {

      let cartDelete = await Cart.findOneAndDelete({ _id: cartId })

      res.status(201).json({ message: 'Товар удален из корзины' })

    } else {
      cartItem.cartSum = cartItem.cartCount * cartPrice

      let cartUpdate = await Cart.updateOne({ _id: cartId }, { $set: { "cartCount": cartItem.cartCount, "cartSum": cartItem.cartSum } })

      res.status(201).json({ message: 'Количество товара уменьшено' })
    }

  }

  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}
)

router.post('/delete', auth, async (req, res) => {

  try {

    const { cartId } = req.body


    let cartDelete = await Cart.findOneAndDelete({ _id: cartId })

    res.status(201).json({ message: 'Товар удален из корзины' })


  }

  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}
)



router.get('/', auth, async (req, res) => {

  try {
    const carts = await Cart.find({ owner: req.user.userId })
    res.json(carts)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }


})

// router.get('/:id', auth, async (req, res) => {

//   try {
//     const cart = await Cart.findById(req.params.id)
//     res.json(cart)
//   } catch (e) {
//     res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//   }

// })

module.exports = router
