import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { AppointmentCard } from './appointment/AppointmentCard'

export const DetailAppointment = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [appointment, setAppointment] = useState(null)
  const appointmentId = useParams().id

  const getAppointment = useCallback(async () => {
    try {
      const fetched = await request(`/api/appointment/${appointmentId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAppointment(fetched)
    } catch (e) { }
  }, [token, appointmentId, request])

  useEffect(() => {
    getAppointment()
  }, [getAppointment])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && appointment && <AppointmentCard appointment={appointment} />}
    </>
  )
}
