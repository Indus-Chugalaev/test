import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
// import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'

export const CreateCart = () => {
  const message = useMessage()
  // const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    cartName: '',
    // cartPrice: '',
    // cartCounts: '',
    // cartCost: '',
    // cartImage: ''
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

  const addCartHandler = async () => {
    try {
      const cartName = form.cartName
      // console.log(cartName);

      const data = await request('/api/cart/generatecart', 'POST', { cartName }, {
        Authorization: `Bearer ${auth.token}`
      })
      message(data.message)
      // history.push(`/detailcart/${data.cart._id}`)

    } catch (e) { }
  }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создание карточки товара в корзину</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка товара</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите название товара"
                  id="cartName"
                  type="text"
                  name="cartName"
                  className="yellow-input"
                  value={form.cartName}
                  onChange={changeHandler}
                />
              </div>
              {/* <p>
              </p>
              <div className="input-field">
                <input
                  placeholder="Введите стоимость товара"
                  id="cartPrice"
                  type="text"
                  name="cartPrice"
                  className="yellow-input"
                  value={form.cartPrice}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите количество товара"
                  id="cartCounts"
                  type="text"
                  name="cartCounts"
                  className="yellow-input"
                  value={form.cartCounts}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите себестоимость товара"
                  id="cartCost"
                  type="text"
                  name="cartCost"
                  className="yellow-input"
                  value={form.cartCost}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите ссылку на изображение товара"
                  id="cartImage"
                  type="text"
                  name="cartImage"
                  className="yellow-input"
                  value={form.cartImage}
                  onChange={changeHandler}
                />
              </div> */}


            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={addCartHandler}
            >
              Создать корзину карточку товара
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}