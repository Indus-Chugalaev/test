import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { OrderCard } from './order/OrderCard'

export const DetailOrder = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [order, setOrder] = useState(null)
  const orderId = useParams().id

  const getOrder = useCallback(async () => {
    try {
      const fetched = await request(`/api/order/${orderId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setOrder(fetched)
    } catch (e) { }
  }, [token, orderId, request])

  useEffect(() => {
    getOrder()
  }, [getOrder])

  if (loading) {
    return <Loader />
  }
  // console.log(order);

  return (
    <>
      {!loading && order && <OrderCard order={order} />}
    </>
  )
}
