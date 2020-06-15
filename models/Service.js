const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  serviceName: { type: String, unique: true, required: true },
  serviceCounts: { type: String },
  serviceCost: { type: String },
  serviceImage: { type: String },
  date: { type: Date, default: Date.now },
  servicePrice: { type: String },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Service', schema)
