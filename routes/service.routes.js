const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Service = require('../models/Service')
const auth = require('../middleware/auth.middleware')
const router = Router()


// admin or root

router.post('/generateservice', auth, async (req, res) => {

  // if (req.user.userRole === 'admin' || req.user.userRole === 'root') {
    try {

      const { serviceName, servicePrice, serviceCounts, serviceCost, serviceImage } = req.body

      const serviceCandidate = await Service.findOne({ serviceName })

      if (serviceCandidate) {
        return res.status(400).json({ message: 'Такая услуга уже существует' })
      }

      const service = new Service({
        serviceName, servicePrice, serviceCounts, serviceCost, serviceImage, owner: req.user.userId
      })

      await service.save()

      res.status(201).json({ service })
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
    const services = await Service.find({})
    res.json(services)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }


})

router.get('/:id', auth, async (req, res) => {

  try {
    const service = await Service.findById(req.params.id)
    res.json(service)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }

})

module.exports = router
