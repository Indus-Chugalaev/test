const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }

      const { email, password, role, userName, userLastName, userPhone, consent } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }


      if (consent === true) {

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword, role, userName, userLastName, userPhone, consent })

        await user.save()

        res.status(201).json({ message: 'Пользователь создан' })
      } else {

        return res.status(400).json({ message: 'Подтвердите согласие с условиями использования' })

      }

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова. Проверьте заполненность всех полей' })
    }
  })

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign(
        { userId: user.id, userEmail: user.email, userRole: user.role },
        config.get('jwtSecret'),
        { expiresIn: '3h' }
      )

      res.json({ token, userId: user.id, userEmail: user.email, userRole: user.role, userPhone: user.userPhone })



    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова auth' })
    }
  })


module.exports = router
