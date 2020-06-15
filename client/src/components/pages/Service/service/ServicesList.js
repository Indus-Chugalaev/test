import React from 'react'
import { Link } from 'react-router-dom'
import s from '../Service.module.css'

export const ServicesList = ({ services }) => {
  if (!services.length) {
    return <p className={s.center}>Услуг пока нет</p>
  }

  return (
    <div className={s.list}>


      {services.map((service, index) => {
        return (
          <div className={s.item} key={service._id}>
            <Link to={`/detailservice/${service._id}`}>{service.serviceName}</Link>
          </div>
        )
      })}
    </div>
  )
}
