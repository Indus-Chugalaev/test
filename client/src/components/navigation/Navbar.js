import React from 'react'
import { NavLink } from 'react-router-dom'
import { AdminBar } from './AdminBar'
import { UserBar } from './UserBar'
import { RootBar } from './RootBar'
import s from './Navbar.module.css'

export const Navbar = () => {

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
      <UserBar />

    </div>
  )
}
