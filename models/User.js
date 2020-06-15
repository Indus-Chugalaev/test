const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'client' },
  date: { type: Date, default: Date.now },
  userName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userPhone: { type: String, required: true },
})

module.exports = model('User', schema)
