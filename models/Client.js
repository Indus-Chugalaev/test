const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  userName: { type: String },
  email: { type: String },
  userLastName: { type: String },
  userPhone: { type: Number },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Client', schema)
