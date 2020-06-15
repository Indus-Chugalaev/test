import React from 'react'

export const ProductCard = ({ product }) => {
  return (
    <>
      <h2>Карточка товара</h2>

      {/* <p>Наименование: <a href={product.productName} target="_blank" rel="noopener noreferrer">{product.productName}</a></p> */}
      <p>Изображение: {product.productImage}</p>
      <p>Наименование: {product.productName}</p>
      <p>Цена: {product.productPrice}</p>
      <p>Количество: {product.productCounts}</p>
      <p>Себестоимость: {product.productCost}</p>
      <p>Дата создания: <strong>{new Date(product.date).toLocaleDateString()}</strong></p>
    </>
  )
}
