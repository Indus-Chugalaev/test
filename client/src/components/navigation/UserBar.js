import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import s from './Navbar.module.css'

export const UserBar = () => {
  const auth = useContext(AuthContext)

  if (auth.userRole === 'client' || auth.userRole === 'admin' || auth.userRole === 'root') {
    return (
      <div className={s.link}>
        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
      </div>
    )
  } else {
    return null
  }

}
