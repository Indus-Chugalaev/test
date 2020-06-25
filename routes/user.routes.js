const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const Client = require('../models/Client')
const router = Router()


// admin or root

router.post('/createuser', auth, async (req, res) => {

  if (
    req.user.userRole === 'admin' ||
    req.user.userRole === 'root' ||
    req.user.userRole === 'individ'
  ) {
    try {


      const {
        clientName,
        clientBirthDate,
        clientPhone,
        clientComment,
      } = req.body

      const userCandidate = await Client.findOne({ clientName })

      if (userCandidate) {
        return res.status(400).json({ message: 'Такой клиент уже существует' })
      }

      const user = new Client({
        clientName,
        clientBirthDate,
        clientPhone,
        clientComment,
        owner: req.user.userId
      })
      console.log(user);

      await user.save()

      res.status(201).json({ user })
    }

    catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  } else {
    res.status(500).json({ message: 'У вас нет прав доступа' })
  }
}
)



router.get('/', auth, async (req, res) => {
  if (
    req.user.userRole === 'admin' ||
    req.user.userRole === 'root'
  ) {
    try {
      const users = await User.find({})
      res.json(users)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  } else {
    if (
      req.user.userRole === 'individ'
    ) {
      try {
        const users = await Client.find({ owner: req.user.userId })
        res.json(users)
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    } else {
      res.status(500).json({ message: 'У вас нет прав доступа' })
    }
  }


})

router.get('/:id', auth, async (req, res) => {
  if (
    req.user.userRole === 'admin' ||
    req.user.userRole === 'root'
  ) {
    try {
      const user = await User.findById(req.params.id)
      res.json(user)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  } else {
    if (
      req.user.userRole === 'individ'
    ) {
      try {
        const user = await Client.findById(req.params.id)
        res.json(user)
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    } else {
      res.status(500).json({ message: 'У вас нет прав доступа' })
    }
  }
})





// router.post('/create-user', auth, async (req, res) => {

//   if (req.user.userRole === 'individ') {
//     try {

//       const { userName } = req.body

//       const userCandidate = await User.findOne({ userName })

//       if (userCandidate) {
//         return res.status(400).json({ message: 'Такой клиент уже существует' })
//       }

//       const user = new Client({
//         userName
//       })

//       await user.save()

//       res.status(201).json({ user })
//     }

//     catch (e) {
//       res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
//   } else {
//     res.status(500).json({ message: 'У вас нет прав доступа' })
//   }
// }
// )



// router.get('/', auth, async (req, res) => {
//   if (req.user.userRole === 'individ') {
//     try {
//       const users = await User.find({ owner: req.user.userId })
//       res.json(users)
//     } catch (e) {
//       res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
//   } else {
//     res.status(500).json({ message: 'У вас нет прав доступа' })
//   }


// })

// router.get('/:id', auth, async (req, res) => {
//   if (req.user.userRole === 'individ') {
//     try {
//       const user = await User.findById(req.params.id)
//       res.json(user)
//     } catch (e) {
//       res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
//   } else {
//     res.status(500).json({ message: 'У вас нет прав доступа' })
//   }
// })

module.exports = router
