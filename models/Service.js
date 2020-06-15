const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  serviceName: { type: String, unique: true, required: true },
  serviceCounts: { type: Number },
  serviceCost: { type: Number },
  serviceImage: { type: String },
  servicePrice: { type: Number },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Service', schema)
