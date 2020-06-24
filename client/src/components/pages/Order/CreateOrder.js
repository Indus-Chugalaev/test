import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'
import { CartsList } from './order/CartsList'
import s from './Order.module.css'

export const CreateOrder = () => {
  const [carts, setCarts] = useState([])
  const { token } = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()

  const fetchCarts = useCallback(async () => {
    try {
      const fetched = await request('/api/cart', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCarts(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])
  // console.log(carts);


  const message = useMessage()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [form, setForm] = useState({
    orderCity: '',
    orderStreet: '',
    orderHome: '',
    orderFlat: '',
    orderComment: '',
  })


  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const addOrderHandler = async () => {

    try {
      const order = { ...form }
      // console.log(order);

      const orderCity = order.orderCity
      const orderStreet = order.orderStreet
      const orderHome = order.orderHome
      const orderFlat = order.orderFlat
      const orderComment = order.orderComment
      let cartsSum = carts
        .map((cart) => { return cart.cartSum })
        .reduce(function (sum, current) {
          return sum + current
        }, 0)
      // console.log(cartsSum);

      const data = await request('/api/order/create-order', 'POST', {
        orderCity,
        orderStreet,
        orderHome,
        orderFlat,
        orderComment,
        carts,
        cartsSum
      }, {
        Authorization: `Bearer ${auth.token}`
      })
      message(data.message)
      history.push(`/detailorder/${data.order._id}`)
    } catch (e) { }
  }
  return (
    <div className={s.row}>
      <div className="col s6 offset-s3">
        <h1>Оформление заказа</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка заказа</span>
            <div>
              <div>Список товаров</div>
              {!loading && <CartsList carts={carts} />}
              <div>Адрес доставки</div>

              <div className="input-field">
                <input
                  placeholder="Город..."
                  id="orderCity"
                  type="text"
                  name="orderCity"
                  className="yellow-input"
                  value={form.orderCity}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Улица..."
                  id="orderStreet"
                  type="text"
                  name="orderStreet"
                  className="yellow-input"
                  value={form.orderStreet}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Дом..."
                  id="orderHome"
                  type="text"
                  name="orderHome"
                  className="yellow-input"
                  value={form.orderHome}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Квартира..."
                  id="orderFlat"
                  type="text"
                  name="orderFlat"
                  className="yellow-input"
                  value={form.orderFlat}
                  onChange={changeHandler}
                />
              </div>
              <textarea
                placeholder="Комментарии к заказу..."
                id="orderComment"
                type="text"
                name="orderComment"
                className="yellow-input"
                value={form.orderComment}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={addOrderHandler}
            >
              Оформить заказ
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}