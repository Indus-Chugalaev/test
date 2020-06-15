const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  appointmentService: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  appointmentClient: { type: String, required: true },
  date: { type: Date, default: Date.now },
  appointmentOwner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Appointment', schema)
