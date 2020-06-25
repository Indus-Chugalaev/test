import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../Loader'
import { ClientCard } from './users/ClientCard'

export const DetailUser = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [client, setClient] = useState(null)
  const clientId = useParams().id

  const getClient = useCallback(async () => {
    try {
      const fetched = await request(`/api/user/${clientId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClient(fetched)
    } catch (e) { }
  }, [token, clientId, request])

  useEffect(() => {
    getClient()
  }, [getClient])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && client && <ClientCard client={client} />}
    </>
  )
}
