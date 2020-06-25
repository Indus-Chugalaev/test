import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { ClientsList } from './users/ClientsList'

export const UsersPage = () => {
  const [clients, setClients] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchClients = useCallback(async () => {
    try {
      const fetched = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClients(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <ClientsList clients={clients} />}
    </>
  )
}
