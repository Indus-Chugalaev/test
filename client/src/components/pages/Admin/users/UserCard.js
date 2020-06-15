import React from 'react'

export const UserCard = ({ user }) => {
  return (
    <>
      <h2>Карточка клиента</h2>

      <p>Имя: {user.userName}</p>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.userPhone}</p>
      <p>Дата создания: <strong>{new Date(user.date).toLocaleDateString()}</strong></p>
    </>
  )
}
