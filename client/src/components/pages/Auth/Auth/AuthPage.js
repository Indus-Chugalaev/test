import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../../hooks/http.hook'
import { useMessage } from '../../../../hooks/message.hook'
// import { AuthContext } from '../../../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import s from './Auth.module.css'

export const AuthPage = () => {
  const history = useHistory()
  // const auth = useContext(AuthContext)
  const message = useMessage()
  const {
    // loading,
    request,
    error,
    clearError
  } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
    userName: '',
    userLastName: '',
    userPhone: '',
    // role: '',
    consent: false
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

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
      history.push(`/login`)
    } catch (e) { }
  }

  // const roleCheckbox = ({ target: { checked } }) => {
  //   if (checked === true) {
  //     form.role = 'individ'
  //   } else {
  //     form.role = ''
  //     delete form['role']
  //   }
  // }

  const consentCheckbox = ({ target: { checked } }) => {
    form.consent = checked
  }

  return (
    <div className="page">
      <div className="header">
        <h1>IT-App</h1>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="title">Регистрация</div>
          <div>
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

              <div className="input">
                <input
                  placeholder="Введите имя"
                  id="userName"
                  type="text"
                  name="userName"
                  className="yellow-input"
                  value={form.userName}
                  onChange={changeHandler}
                />
              </div>

              <div className="input">
                <input
                  placeholder="Введите фамилию"
                  id="userLastName"
                  type="text"
                  name="userLastName"
                  className="yellow-input"
                  value={form.userLastName}
                  onChange={changeHandler}
                />
              </div>

              <div className="input">
                <input
                  placeholder="Введите номер телефона"
                  id="userPhone"
                  type="text"
                  name="userPhone"
                  className="yellow-input"
                  value={form.userPhone}
                  onChange={changeHandler}
                />
              </div>

              {/* <div className={s.check}>
                <label>
                  <input
                    type="checkbox"
                    value=""
                    className={s.checkInput}
                    onChange={roleCheckbox}
                  />
                  Мне нужен локальный аккаунт
                  </label>
              </div> */}

              <div className={s.check}>
                <label>
                  <input
                    type="checkbox"
                    value=""
                    className={s.checkInput}
                    onChange={consentCheckbox}
                  />
                  Я согласен с условиями использования
                  </label>
              </div>

            </div>
          </div>
          <div className="action">
            <button
              className="a-button"
              onClick={registerHandler}
            // disabled={
            //   !form.userConsent
            //   // ||
            //   // loading
            // }
            >
              Создать аккаунт
              </button>

            <div className="b-button">
              <a href='/login'>Уже есть аккаунт?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
