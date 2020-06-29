import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { ServicesList } from './service/ServicesList'

export const ServicesPage = (props) => {
  // const [services, setServices] = useState([])
  const { loading, request } = useHttp()
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

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <ServicesList props={props} />}
    </>
  )
}
