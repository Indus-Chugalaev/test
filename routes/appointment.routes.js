const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Appointment = require('../models/Appointment')
const auth = require('../middleware/auth.middleware')
const router = Router()


// admin or root
router.post('/create-appointment', auth, async (req, res) => {

  try {

    const { appointmentClient, appointmentService, appointmentDate, appointmentTime } = req.body

    const appointment = new Appointment({
      appointmentService, appointmentDate, appointmentTime, appointmentClient, appointmentOwner: req.user.userId
    })

    await appointment.save()

    res.status(201).json({ appointment })
  }

  catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
}

)


// all users
router.get('/', auth, async (req, res) => {

  try {
    const appointments = await Appointment.find({})
    res.json(appointments)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }


})

router.get('/:id', auth, async (req, res) => {

  try {
    const appointment = await Appointment.findById(req.params.id)
    res.json(appointment)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }

})

module.exports = router
