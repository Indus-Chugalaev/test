import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from '../Order.module.css'

export const OrdersList = ({ orders }) => {
  if (!orders.length) {
    return <div className={s.list}>
      <p className={s.center}>Заказов пока нет</p>
      {/* <div>
        <NavLink to="/createorder">Создать заказ</NavLink>
      </div> */}
    </div>
  }

  return (
    <div className={s.list}>
      {/* <div>
        <NavLink to="/createorder">Создать заказ</NavLink>
      </div> */}

      {orders.map((order, index) => {
        return (
          <div className={s.item} key={order._id}>
            <div>
              <Link
                to={`/detailorder/${order._id}`}
              >
                <div>Покупатель: {order.orderOwner}</div>
                {/* <div>                {order.carts}</div> */}
                <div>Адрес:</div>
                <div>Город: {order.orderCity}</div>
                <div>Дом: {order.orderHome}</div>
                <div>Квартира: {order.orderFlat}</div>
                <div> Комментарии к заказу: {order.orderComment}</div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
