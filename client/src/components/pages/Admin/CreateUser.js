import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../../hooks/message.hook'

export const CreateUser = () => {
  const message = useMessage()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    userName: '',
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
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Создание карточки клиента</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Карточка клиента</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите имя клиента"
                  id="userName"
                  type="text"
                  name="userName"
                  className="yellow-input"
                  value={form.userName}
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