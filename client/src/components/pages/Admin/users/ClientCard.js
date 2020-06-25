import React from 'react'

export const ClientCard = ({ client }) => {
  return (
    <>
      <h2>Карточка клиента</h2>

      <p>Имя: {client.clientName}</p>
      <p>Email: {client.email}</p>
      <p>Дата рождения: {client.clientBirthDate}</p>
      <p>Телефон: {client.clientPhone}</p>
      <p>Комментарии: {client.clientComment}</p>
      <p>Дата создания: <strong>{new Date(client.date).toLocaleDateString()}</strong></p>
    </>
  )
}
