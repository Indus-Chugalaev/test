import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import s from '../Product.module.css'

import { useHttp } from '../../../../hooks/http.hook'
import { useMessage } from '../../../../hooks/message.hook'
import { AuthContext } from '../../../../context/AuthContext'

export const ProductCard = ({ product }) => {

  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  function deleteProduct(product) {

    const deleteHandler = async () => {

      try {
        const productDId = { productId: product.target.dataset.id }

        const data = await request(
          '/api/product/productdelete',
          'POST',
          { productDId },
          { Authorization: `Bearer ${auth.token}` }
        )

        message(data.message)
        history.push(`/products`)

      } catch (e) { }
    }

    deleteHandler()

  }

  return (
    <>
      <h2>Карточка товара</h2>

      <div>Изображение: {product.productImage}</div>
      <div>Наименование: {product.productName}</div>
      <div>Цена: {product.productPrice}</div>
      {(auth.userRole === 'admin' || auth.userRole === 'root') ?
        <div>
          Количество: {product.productCounts}
        </div> :
        null}
      {(auth.userRole === 'admin' || auth.userRole === 'root') ?
        <div>
          Себестоимость: {product.productCost}
        </div> :
        null}
      {(auth.userRole === 'admin' || auth.userRole === 'root') ?
        <div>
          Дата создания: <strong>{new Date(product.date).toLocaleDateString()}</strong>
        </div> :
        null}
      {(auth.userRole === 'admin' || auth.userRole === 'root') ?
        <Link to='#'
          className={s.link}
          onClick={deleteProduct}
          data-id={product._id}
        >
          Удалить товар
      </Link> :
        null}
    </>
  )
}
