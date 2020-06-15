const { Schema, model, Types } = require('mongoose')

const orderSchema = new Schema({
  carts: [
    {
      cartId: { type: String },
      cartName: { type: String, required: true },
      cartPrice: { type: Number, required: true },
      cartCount: { type: Number },
      cartSum: { type: Number },
      cartImage: { type: String },
      date: { type: Date, default: Date.now },
      owner: { type: Types.ObjectId, ref: 'User' }
    }
  ],
  orderCity: { type: String, required: true },
  orderStreet: { type: String },
  orderHome: { type: String },
  orderFlat: { type: String },
  orderComment: { type: String },
  cartsSum: { type: Number },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Order', orderSchema)
