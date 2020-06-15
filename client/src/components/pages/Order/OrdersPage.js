import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { OrdersList } from './order/OrdersList'

export const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchOrders = useCallback(async () => {
    try {
      const fetched = await request('/api/order', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setOrders(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <OrdersList orders={orders} />}
    </>
  )
}
