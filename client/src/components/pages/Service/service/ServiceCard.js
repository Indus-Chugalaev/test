import React from 'react'

export const ServiceCard = ({ service }) => {
  return (
    <>
      <h2>Карточка услуги</h2>

      {/* <p>Наименование: <a href={service.serviceName} target="_blank" rel="noopener noreferrer">{service.serviceName}</a></p> */}
      <p>Наименование: {service.serviceName}</p>
      <p>Цена: {service.servicePrice}</p>
      <p>Количество: {service.serviceCounts}</p>
      <p>Себестоимость: {service.serviceCost}</p>
      <p>Изображение: {service.serviceImage}</p>
      <p>Дата создания: <strong>{new Date(service.date).toLocaleDateString()}</strong></p>
    </>
  )
}
