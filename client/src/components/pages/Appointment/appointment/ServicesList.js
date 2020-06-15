import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from '../Appointment.module.css'

import { useHttp } from '../../../../hooks/http.hook'
import { AuthContext } from '../../../../context/AuthContext'
import { Loader } from '../../../Loader'

export const ServicesList = ({ services }) => {
  // const [service, setServices] = useState([])
  // const { loading, request } = useHttp()
  // const { token } = useContext(AuthContext)

  // const fetchServices = useCallback(async () => {
  //   try {
  //     const fetched = await request('/api/service', 'GET', null, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     setServices(fetched)
  //   } catch (e) { }
  // }, [token, request])

  // useEffect(() => {
  //   fetchServices()
  // }, [fetchServices])

  console.log(window)

  // if (!services.length) {
  //   return (
  //     <div className={s.list}><p> Журнал записи пока пуст</p>
  //     </div>
  //   )
  // }

  // return (
  //   <div className={s.list}>

  //     {services.map((service, index) => {
  //       return (
  //         <div className={s.item} key={service._id}>
  //           <Link to={`/detailservice/${service._id}`}>
  //             <div>
  //               <div>
  //                 Услуга: {service.serviceName}
  //               </div>

  //             </div>
  //           </Link>
  //         </div>

  //       )
  //     })}
  //   </div>
  // )
}
