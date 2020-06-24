import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import s from './Navbar.module.css'

export const AdminBar = () => {
  const auth = useContext(AuthContext)

  if (auth.userRole === 'admin' || auth.userRole === 'root' || auth.userRole === 'individ') {
    return (
      <>
        <div className={s.link}>
          <NavLink to="/orders" activeClassName={s.active}>Заказы</NavLink>
        </div>
        <div className={s.link}>
          <NavLink to="/appointments" activeClassName={s.active}>Журнал записи</NavLink>
        </div>
        <div className={s.link}>
          <NavLink to="/createproduct" activeClassName={s.active}>Создать карточку товара</NavLink>
        </div>
        <div className={s.link}>
          <NavLink to="/createservice" activeClassName={s.active}>Создать карточку услуги</NavLink>
        </div>
        <div className={s.link}>
          <NavLink to="/createuser" activeClassName={s.active}>Создать карточку клиента</NavLink>
        </div>
        <div className={s.link}>
          <NavLink to="/users" activeClassName={s.active}>Клиенты</NavLink>
        </div>
      </>
    )
  } else {
    return null
  }

}
