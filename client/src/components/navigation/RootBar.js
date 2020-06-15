import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import s from './Navbar.module.css'

export const RootBar = () => {
  const auth = useContext(AuthContext)

  if (auth.userRole === 'root') {
    return (
      <>
        <div className={s.link}>
          <NavLink to="/createproduct" activeClassName={s.active}>Сотрудники</NavLink>
        </div>
      </>
    )
  } else {
    return null
  }

}
