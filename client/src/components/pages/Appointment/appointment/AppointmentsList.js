import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from '../Appointment.module.css'

export const AppointmentsList = ({ appointments }) => {
  if (!appointments.length) {
    return (
      <div className={s.list}><p className={s.center}> Журнал записи пока пуст</p>
        <div>
          <NavLink to="/createappointment">Создать запись в журнале</NavLink>
        </div>
      </div>
    )
  }

  return (
    <div className={s.list}>
      <div>
        <NavLink to="/createappointment">Создать запись в журнале</NavLink>
      </div>

      {appointments.map((appointment, index) => {
        return (
          <div className={s.item} key={appointment._id}>
            <Link to={`/detailappointment/${appointment._id}`}>
              <div>
                <div>
                  Клиент: {appointment.appointmentClient}
                </div>
                <div>
                  Дата: {appointment.appointmentDate}
                </div>
                <div>
                  Время: {appointment.appointmentTime}
                </div>
              </div>
            </Link>
          </div>

        )
      })}
    </div>
  )
}
