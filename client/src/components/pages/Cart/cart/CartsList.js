import React, { useContext, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import s from '../Cart.module.css'

import { useHttp } from '../../../../hooks/http.hook'
import { useMessage } from '../../../../hooks/message.hook'
import { AuthContext } from '../../../../context/AuthContext'


export const CartsList = ({ props }) => {
  // const history = useHistory()
  const auth = useContext(AuthContext)
  const {
    // loading, 
    request,
    error,
    clearError
  } = useHttp()
  const message = useMessage()
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  // start Plus
  function plusHandler(cart) {

    const cartItem = {
      cartId: cart.target.dataset.id,
      cartCount: cart.target.dataset.count,
      cartPrice: cart.target.dataset.price
    }
    const addPlusHandler = async () => {

      try {
        const cartId = cartItem.cartId
        const cartCount = cartItem.cartCount
        const cartPrice = cartItem.cartPrice

        const data = await request('/api/cart/plus', 'POST', { cartId, cartCount, cartPrice }, {
          Authorization: `Bearer ${auth.token}`
        })
        message(data.message)

      } catch (e) {
        console.log('ошибка увеличения количества товара');
      }
    }

    addPlusHandler()

  }
  // end Plus

  // start Minus
  function minusHandler(cart) {

    const cartItemPlus = {
      cartId: cart.target.dataset.id,
      cartCount: cart.target.dataset.count,
      cartPrice: cart.target.dataset.price
    }
    const addMinusHandler = async () => {

      try {
        const cartId = cartItemPlus.cartId
        const cartCount = cartItemPlus.cartCount
        const cartPrice = cartItemPlus.cartPrice

        const data = await request('/api/cart/minus', 'POST', { cartId, cartCount, cartPrice }, {
          Authorization: `Bearer ${auth.token}`
        })
        message(data.message)
      } catch (e) { }
    }

    addMinusHandler()

  }
  // end Minus

  // start Delete
  function deleteHandler(cart) {

    const cartItemPlus = {
      cartId: cart.target.dataset.id
    }
    const addDeleteHandler = async () => {

      try {
        const cartId = cartItemPlus.cartId

        const data = await request('/api/cart/delete', 'POST', { cartId }, {
          Authorization: `Bearer ${auth.token}`
        })
        message(data.message)

      } catch (e) { }
    }

    addDeleteHandler()

  }
  // end Delete


  if (!props.store.state.carts.length) {
    return <p className={s.center}>Корзина пуста</p>
  }

  let cartsSum = props.store.state.carts
    .map((cart) => { return cart.cartSum })
    .reduce(function (sum, current) {
      return sum + current
    }, 0)

  return (
    <div className={s.list}>


      {props.store.state.carts.map((cart, index) => {
        return (
          <div className={s.item} key={cart._id}>
            <Link to={`/detailproduct/${cart.cartId}`}>   {cart.cartName}   -   {cart.cartPrice} руб
                    </Link>
            <Link
              to='#'
              className={s.link}
              onClick={plusHandler}
              data-id={cart._id}
              data-count={cart.cartCount}
              data-price={cart.cartPrice}
            >
              +
                    </Link>
            <div
              className={s.buttonC}
            >
              {cart.cartCount} шт
                    </div>
            <Link
              to='#'
              className={s.link}
              onClick={minusHandler}
              data-id={cart._id}
              data-count={cart.cartCount}
              data-price={cart.cartPrice}
            >
              -
                    </Link>
            <Link
              to='#'
              className={s.link}
              onClick={deleteHandler}
              data-id={cart._id}
            >
              X
                    </Link>
            <div>
              Подитог: {cart.cartSum} руб
                      </div>
          </div>
        )
      })}
      <div>
        Итого: {cartsSum} руб
      </div>
      <div className={s.link}>
        <NavLink to="/createorder" >Оформить заказ</NavLink>
      </div>
    </div>
  )
}
