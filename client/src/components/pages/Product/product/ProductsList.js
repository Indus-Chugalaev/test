import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import s from '../Product.module.css'

import { useHttp } from '../../../../hooks/http.hook'
import { useMessage } from '../../../../hooks/message.hook'
import { AuthContext } from '../../../../context/AuthContext'



export const ProductsList = ({ products }) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])



  if (!products.length) {
    return <p className="center">Товаров пока нет</p>
  }


  // start addToCart

  function addCartItemHandler(product) {
    const cart = {
      cartId: product.target.dataset.id,
      cartName: product.target.dataset.name,
      cartPrice: product.target.dataset.price,
      cartCount: product.target.dataset.count
    }
    const addProductHandler = async () => {
      // console.log(cart);



      try {
        const cartId = cart.cartId
        const cartName = cart.cartName
        const cartPrice = cart.cartPrice
        const cartCount = cart.cartCount
        // console.log(cartName);


        const data = await request('/api/cart/generatecart', 'POST', { cartId, cartName, cartPrice, cartCount }, {
          Authorization: `Bearer ${auth.token}`
        })
        message(data.message)
        // history.push(`/detailcart/${data.cart._id}`)

      } catch (e) {
        // console.log('ошибка добавления товара в корзину');
      }
    }

    addProductHandler()

  }
  // end addoCart



  return (
    <div className={s.list}>
      {products.map((product, index) => {
        return (
          <div className={s.item} key={product._id}>
            <Link to={`/detailproduct/${product._id}`}>
              <div>
                <div>
                  {/* <img src='../../../../../assets/noimage.gif' /> */}
                  <img src={
                    (`${product.productImage}`) ?
                      `${product.productImage}` :
                      'https://whey-market.ru/image/cache/catalog/temp/5/ponents-com_jshopping-files-img_products-noimage-800x800.gif'
                  } />
                  {/* {product.productImage} */}
                </div>
                <div>
                  {product.productName}
                </div>
                <div>
                  {product.productPrice}
                </div>
              </div>
            </Link>
            <Link className={s.link}
              // >
              // {/* <button */}
              onClick={addCartItemHandler}
              // className={s.buttonPrimary}
              data-id={product._id}
              data-name={product.productName}
              data-price={product.productPrice}
            >
              Добавить в корзину
                {/* </button> */}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
