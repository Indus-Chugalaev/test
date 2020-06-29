const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  productName: { type: String, required: true },
  productCounts: { type: Number },
  productCost: { type: Number },
  productImage: { type: String, default: 'no_photo.jpg' },
  date: { type: Date, default: Date.now },
  productPrice: { type: Number, required: true },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Product', schema)
