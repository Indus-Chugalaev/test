import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from '../Product.module.css'

import { useHttp } from '../../../../hooks/http.hook'
import { useMessage } from '../../../../hooks/message.hook'
import { AuthContext } from '../../../../context/AuthContext'



export const ProductsList = ({ props }) => {
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
  // console.log(props.store);
  // console.log(products.products);



  if (!props.store.state.products.length) {
    return <p className="center">Товаров пока нет</p>
  }


  // start addToCart

  function addToCartHandler(product) {
    const cart = {
      cartId: product.target.dataset.id,
      cartName: product.target.dataset.name,
      cartPrice: product.target.dataset.price,
      cartCount: product.target.dataset.count
    }
    const add = async () => {
      try {
        const cartId = cart.cartId
        const cartName = cart.cartName
        const cartPrice = cart.cartPrice
        const cartCount = cart.cartCount

        const data = await request(
          '/api/cart/add',
          'POST',
          { cartId, cartName, cartPrice, cartCount }, {
          Authorization: `Bearer ${auth.token}`
        })
        message(data.message)

      } catch (e) { }
    }

    add()

  }
  // end addToCart



  return (
    <div className={s.list}>
      {props.store.state.products.map((product, index) => {
        return (
          <div className={s.item} key={product._id}>
            <Link to={`/detailproduct/${product._id}`}>
              <div>
                <div>
                  <img src=
                    {
                      (`${product.productImage}`) ?
                        `${product.productImage}` :
                        'https://istra.kosbe.ru/images/no_photo.jpg'
                    }
                    alt={`${product.productName}`}
                  />
                </div>
                <div>
                  {product.productName}
                </div>
                <div>
                  {product.productPrice} руб
                </div>
              </div>
            </Link>
            <Link
              to='#'
              className={s.link}
              onClick={addToCartHandler}
              data-id={product._id}
              data-name={product.productName}
              data-price={product.productPrice}
            >
              Добавить в корзину
            </Link>
          </div>
        )
      })}
    </div>
  )
}
