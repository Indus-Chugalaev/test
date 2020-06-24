import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'

export const CreateService = () => {
  const message = useMessage()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    serviceName: '',
    servicePrice: '',
    serviceCounts: '',
    serviceCost: '',
    serviceImage: ''
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

  const addServiceHandler = async () => {
    try {
      const data = await request('/api/service/create-service', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detailservice/${data.service._id}`)
    } catch (e) { }
  }
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создание карточки услуги</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка услуги</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите название услуги"
                  id="serviceName"
                  type="text"
                  name="serviceName"
                  className="yellow-input"
                  value={form.serviceName}
                  onChange={changeHandler}
                />
              </div>
              <p>
              </p>
              <div className="input-field">
                <input
                  placeholder="Введите стоимость услуги"
                  id="servicePrice"
                  type="text"
                  name="servicePrice"
                  className="yellow-input"
                  value={form.servicePrice}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите количество услуг"
                  id="serviceCounts"
                  type="text"
                  name="serviceCounts"
                  className="yellow-input"
                  value={form.serviceCounts}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите себестоимость услуги"
                  id="serviceCost"
                  type="text"
                  name="serviceCost"
                  className="yellow-input"
                  value={form.serviceCost}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите ссылку на изображение услуги"
                  id="serviceImage"
                  type="text"
                  name="serviceImage"
                  className="yellow-input"
                  value={form.serviceImage}
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
              onClick={addServiceHandler}
            >
              Создать услугу
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}