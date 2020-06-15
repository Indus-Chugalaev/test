const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.get('/:id', auth, async (req, res) => {
  try {
    let id1 = req.user.userId

    const user = await User.findById({ _id: id1 })

    res.json(user)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
