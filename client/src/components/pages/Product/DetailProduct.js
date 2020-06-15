import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { ProductCard } from './product/ProductCard'

export const DetailProduct = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [product, setProduct] = useState(null)
  const productId = useParams().id

  const getProduct = useCallback(async () => {
    try {
      const fetched = await request(
        `/api/product/${productId}`,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      )
      setProduct(fetched)
    } catch (e) { }
  }, [token, productId, request])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && product && <ProductCard product={product} />}
    </>
  )
}
