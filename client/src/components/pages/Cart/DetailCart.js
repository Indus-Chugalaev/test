import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { CartCard } from './cart/CartCard'

export const DetailCart = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [cart, setCart] = useState(null)
  const cartId = useParams().id

  const getCart = useCallback(async () => {
    try {
      const fetched = await request(`/api/cart/${cartId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setCart(fetched)
    } catch (e) { }
  }, [token, cartId, request])

  useEffect(() => {
    getCart()
  }, [getCart])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && cart && <CartCard cart={cart} />}
    </>
  )
}
