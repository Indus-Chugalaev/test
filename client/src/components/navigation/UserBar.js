import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import s from './Navbar.module.css'

export const UserBar = () => {
  const auth = useContext(AuthContext)

  if (auth.userRole === 'client' || auth.userRole === 'admin' || auth.userRole === 'root' || auth.userRole === 'individ') {
    return (
      <div className={s.link}>
        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
      </div>
    )
  } else {
    return null
  }

}
