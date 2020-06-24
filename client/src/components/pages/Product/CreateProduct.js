import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'

export const CreateProduct = () => {
  const message = useMessage()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    productName: '',
    productPrice: '',
    productCounts: '',
    productCost: '',
    productImage: ''
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

  const addProductHandler = async () => {
    try {
      const data = await request('/api/product/createproduct', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detailproduct/${data.product._id}`)
      console.log({ ...form });

    } catch (e) { }
  }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создание карточки товара</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка товара</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите название товара"
                  id="productName"
                  type="text"
                  name="productName"
                  className="yellow-input"
                  value={form.productName}
                  onChange={changeHandler}
                />
              </div>
              <p>
              </p>
              <div className="input-field">
                <input
                  placeholder="Введите стоимость товара"
                  id="productPrice"
                  type="text"
                  name="productPrice"
                  className="yellow-input"
                  value={form.productPrice}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите количество товара"
                  id="productCounts"
                  type="text"
                  name="productCounts"
                  className="yellow-input"
                  value={form.productCounts}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите себестоимость товара"
                  id="productCost"
                  type="text"
                  name="productCost"
                  className="yellow-input"
                  value={form.productCost}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите ссылку на изображение товара"
                  id="productImage"
                  type="text"
                  name="productImage"
                  className="yellow-input"
                  value={form.productImage}
                  onChange={changeHandler}
                />
              </div>


            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={addProductHandler}
            >
              Создать товар
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}