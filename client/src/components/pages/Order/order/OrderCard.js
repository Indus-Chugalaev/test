import React from 'react'
import { Link } from 'react-router-dom';

export const OrderCard = ({ order }) => {
  return (
    <>
      <h2>Карточка заказа</h2>

      <div>Товары:
        {order.carts.map((cart, index) => {

        return (
          <div key={cart._id}>
            <Link to={`/detailproduct/${cart.cartId}`}>
              <div>
                {cart.cartName} - {cart.cartPrice} руб - {cart.cartCount} шт - Подитог: {cart.cartSum} руб
              </div>
            </Link>
          </div>
        )
      })}
      </div>
      <div>Итого товаров на сумму: {order.cartsSum}</div>
      <p>Адрес доставки</p>
      <p>Город: {order.orderCity}</p>
      <p>Улица: {order.orderStreet}</p>
      <p>Дом: {order.orderHome}</p>
      <p>Квартира: {order.orderFlat}</p>
      <p>Комментарии: {order.orderComment}</p>
      <p>Дата оформления заказа: <strong>{new Date(order.date).toLocaleDateString()}</strong></p>
    </>
  )
}
