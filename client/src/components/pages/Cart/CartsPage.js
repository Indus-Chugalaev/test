import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { CartsList } from './cart/CartsList'

export const CartsPage = () => {
  const [carts, setCarts] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const fetchCarts = useCallback(async () => {
    try {
      const fetched = await request('/api/cart', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCarts(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchCarts()
  }, [fetchCarts])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <CartsList carts={carts} />}
    </>
  )
}
