const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  cartId: { type: String },
  cartName: { type: String, required: true },
  cartPrice: { type: Number, required: true },
  cartCount: { type: Number, default: 1 },
  cartSum: { type: Number },
  cartImage: { type: String },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Cart', schema)
