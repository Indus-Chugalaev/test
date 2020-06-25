import React from 'react'
import { Link } from 'react-router-dom'
import s from '../Admin.module.css'

export const ClientsList = ({ clients }) => {
  if (!clients.length) {
    return <p className={s.center}>Клиентов пока нет</p>
  }

  return (
    <div className={s.list}>


      {clients.map((client, index) => {
        return (
          <div className={s.item} key={client._id}>
            <div>
              <Link to={`/detailuser/${client._id}`}>
                <div>
                  {client.clientName}
                </div>
                <div>
                  {client.email}
                </div>
                <div>
                  {client.clientPhone}
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
