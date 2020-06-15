import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { ServiceCard } from './service/ServiceCard'

export const DetailService = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [service, setService] = useState(null)
  const serviceId = useParams().id

  const getService = useCallback(async () => {
    try {
      const fetched = await request(`/api/service/${serviceId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setService(fetched)
    } catch (e) { }
  }, [token, serviceId, request])

  useEffect(() => {
    getService()
  }, [getService])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && service && <ServiceCard service={service} />}
    </>
  )
}
