import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'
import s from './Admin.module.css'

export const CreateUser = () => {
  const message = useMessage()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    clientName: '',
    clientBirthDate: '',
    clientPhone: '',
    clientComment: '',
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

  const addUserHandler = async () => {
    try {
      const data = await request('/api/user/createuser', 'POST', { ...form }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detailuser/${data.user._id}`)
    } catch (e) { }
  }
  return (
    <div className={s.row}>
      <div className="col s6 offset-s3">
        <h1>Создание карточки клиента</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка клиента</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите ФИО клиента"
                  id="clientName"
                  type="text"
                  name="clientName"
                  className="yellow-input"
                  value={form.clientName}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите дату рождения клиента"
                  id="clientBirthDate"
                  type="text"
                  name="clientBirthDate"
                  className="yellow-input"
                  value={form.clientBirthDate}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите номер телефона клиента"
                  id="clientPhone"
                  type="text"
                  name="clientPhone"
                  className="yellow-input"
                  value={form.clientPhone}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-field">
                <input
                  placeholder="Комментарии"
                  id="clientComment"
                  type="text"
                  name="clientComment"
                  className="yellow-input"
                  value={form.clientComment}
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
              onClick={addUserHandler}
            >
              Создать карточку клиента
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}