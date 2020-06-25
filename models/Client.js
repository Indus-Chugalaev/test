const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  clientName: { type: String, required: true },
  clientBirthDate: { type: String },
  clientPhone: { type: Number },
  clientComment: { type: String },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Client', schema)
