import React from 'react'
import { Link } from 'react-router-dom'
import s from '../Order.module.css'

export const CartsList = ({ carts }) => {
  if (!carts.length) {
    return <p className={s.center}>Корзина пуста</p>
  }

  let cartsSum = carts
    .map((cart) => { return cart.cartSum })
    .reduce(function (sum, current) {
      return sum + current
    }, 0)


  return (
    <div className={s.list}>


      {carts.map((cart, index) => {
        return (
          <div className={s.item} key={cart._id}>
            <Link to={`/detailproduct/${cart.cartId}`}>
              {cart.cartName}   /   {cart.cartPrice} руб   /   {cart.cartCount} шт
              <div>
                Подитог: {cart.cartSum} руб
              </div>
            </Link>
          </div>
        )
      })}

      Итого товаров на сумму: {cartsSum} руб

    </div>
  )
}
