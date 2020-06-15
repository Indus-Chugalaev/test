import React from 'react'

export const CartCard = ({ cart }) => {
  return (
    <>
      <h2>Карточка товара</h2>

      {/* <p>Наименование: <a href={cart.cartName} target="_blank" rel="noopener noreferrer">{cart.cartName}</a></p> */}
      <p>Наименование: {cart.cartName}</p>
      <p>Цена: {cart.cartPrice}</p>
      <p>Количество: {cart.cartCounts}</p>
      <p>Дата создания: <strong>{new Date(cart.date).toLocaleDateString()}</strong></p>
    </>
  )
}
