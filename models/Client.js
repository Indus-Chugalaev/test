const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  // role: { type: String, required: true },
  userName: { type: String, required: true },
})

module.exports = model('Client', schema)
