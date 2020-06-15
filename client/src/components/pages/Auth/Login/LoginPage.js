import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../../hooks/http.hook'
import { useMessage } from '../../../../hooks/message.hook'
import { AuthContext } from '../../../../context/AuthContext'
import './style.css'

export const LoginPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {
    // loading, 
    request,
    error,
    clearError
  } = useHttp()
  const [form, setForm] = useState({
    email: '', password: '', role: ''
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

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId, data.userEmail, data.userRole)
    } catch (e) { }
  }

  return (
    <div className="page">
      <div className="header">
        <h1>IT-App</h1>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="title">Авторизация</div>
          <div className="form">

            <div className="input">
              <input
                placeholder="Введите email"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                value={form.email}
                onChange={changeHandler}
              />
            </div>

            <div className="input">
              <input
                placeholder="Введите пароль"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                value={form.password}
                onChange={changeHandler}
              />
            </div>

          </div>
        </div>
        <div className="action">
          <button
            className="a-button"
            onClick={loginHandler}
          >
            Авторизоваться
          </button>
          <div className="b-button">
            <a href='/auth'>
              Создать аккаунт
                </a>
          </div>
        </div>
      </div>
    </div>
  )
}
