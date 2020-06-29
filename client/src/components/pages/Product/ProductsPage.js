import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'
import { ProductsList } from './product/ProductsList'

export const ProductsPage = (props) => {
  // const [products, setProducts] = useState([])
  const { loading, request } = useHttp()
  // const { token } = useContext(AuthContext)

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const fetched = await request('/api/product', 'GET', null, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     setProducts(fetched)
  //   } catch (e) { }
  // }, [token, request])



  // useEffect(() => {
  //   fetchProducts()
  // }, [fetchProducts])
  // console.log(products);
  // console.log(3);





  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <ProductsList props={props} />}
    </>
  )
}
