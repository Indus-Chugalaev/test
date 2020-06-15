import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'

// import { Loader } from '../../../Loader'

// import { ServicesList } from './appointment/ServicesList'

export const CreateAppointment = () => {
  const message = useMessage()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    appointmentClient: '',
    appointmentService: '',
    appointmentDate: '',
    appointmentTime: ''
  })

  const [service, setServices] = useState([])
  const { token } = useContext(AuthContext)

  const fetchServices = useCallback(async () => {
    try {
      const fetched = await request('/api/service', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setServices(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])


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

  const addAppointmentHandler = async () => {
    try {
      const data = await request('/api/appointment/generateappointment', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detailappointment/${data.appointment._id}`)
    } catch (e) { }
  }

  console.log(auth);


  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создание карточки записи в журнале</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка записи</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Выберите клиента"
                  id="appointmentClient"
                  type="text"
                  name="appointmentClient"
                  className="yellow-input"
                  value={form.appointmentClient}
                  onChange={changeHandler}
                />
              </div>
              <p>
              </p>
              <div className="input-field">
                <input
                  placeholder="Выберите услугу"
                  id="appointmentService"
                  type="text"
                  name="appointmentService"
                  className="yellow-input"
                  value={form.appointmentService}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Выберите дату"
                  id="appointmentDate"
                  type="text"
                  name="appointmentDate"
                  className="yellow-input"
                  value={form.appointmentDate}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Выберите время"
                  id="appointmentTime"
                  type="text"
                  name="appointmentTime"
                  className="yellow-input"
                  value={form.appointmentTime}
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
              onClick={addAppointmentHandler}
            >
              Добавить запись в журнал
            </button>
            {/* <ServicesList /> */}
          </div>
        </div>
      </div>
    </div>
  )
}