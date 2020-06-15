import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { AdminBar } from './AdminBar'
import { UserBar } from './UserBar'
import { RootBar } from './RootBar'
import s from './Navbar.module.css'

export const Navbar = () => {
  // const history = useHistory()
  // const auth = useContext(AuthContext)

  // const logoutHandler = event => {
  //   event.preventDefault()
  //   auth.logout()
  //   history.push('/')
  // }

  return (
    <div className={s.wrapper}>
      <div className={s.link}>
        <NavLink to="/products" activeClassName={s.active}>Товары</NavLink>
      </div>
      <div className={s.link}>
        <NavLink to="/services" activeClassName={s.active}>Услуги</NavLink>
      </div>
      <AdminBar />
      <RootBar />
      <div className={s.link}>
        <NavLink to="/carts" activeClassName={s.active}>Корзина</NavLink>
      </div>
      {/* <div className={s.link}>
        <NavLink to="/createorder" activeClassName={s.active}>Оформление заказа</NavLink>
      </div> */}
      <UserBar />

    </div>
  )
}
