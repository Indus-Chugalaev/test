import React from 'react'

export const AppointmentCard = ({ appointment }) => {
  return (
    <>
      <h2>Карточка записи</h2>

      {/* <p>Наименование: <a href={appointment.appointmentName} target="_blank" rel="noopener noreferrer">{appointment.appointmentName}</a></p> */}
      <p>Клиент: {appointment.appointmentClient}</p>
      <p>Услуга: {appointment.appointmentService}</p>
      <p>Дата: {appointment.appointmentDate}</p>
      <p>Время: {appointment.appointmentTime}</p>
      <p>Кто создал запись: {appointment.appointmentOwner}</p>
      <p>Дата создания: <strong>{new Date(appointment.date).toLocaleDateString()}</strong></p>
    </>
  )
}
