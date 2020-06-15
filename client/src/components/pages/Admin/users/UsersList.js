import React from 'react'
import { Link } from 'react-router-dom'
import s from '../Admin.module.css'

export const UsersList = ({ users }) => {
  if (!users.length) {
    return <p className={s.center}>Клиентов пока нет</p>
  }

  return (
    <div className={s.list}>


      {users.map((user, index) => {
        return (
          <div className={s.item} key={user._id}>
            <div>
              <Link to={`/detailuser/${user._id}`}>
                <div>
                  {user.userName}
                </div>
                <div>
                  {user.email}
                </div>
                <div>
                  {user.userPhone}
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
