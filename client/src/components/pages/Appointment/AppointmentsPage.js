import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { AppointmentsList } from './appointment/AppointmentsList'

export const AppointmentsPage = (props) => {
  // const [appointments, setAppointments] = useState([])
  const { loading, request } = useHttp()
  // const { token } = useContext(AuthContext)

  // const fetchAppointments = useCallback(async () => {
  //   try {
  //     const fetched = await request('/api/appointment', 'GET', null, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     setAppointments(fetched)
  //   } catch (e) { }
  // }, [token, request])

  // useEffect(() => {
  //   fetchAppointments()
  // }, [fetchAppointments])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <AppointmentsList props={props} />}


    </>
  )
}
