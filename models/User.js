const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userPhone: { type: Number, required: true },
  role: { type: String, default: 'individ' },
  consent: { type: String, required: true }, // !rewiew
  date: { type: Date, default: Date.now },
})

module.exports = model('User', schema)
