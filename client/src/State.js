import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useHttp } from './hooks/http.hook'
import { useMessage } from './hooks/message.hook'
import { AuthContext } from './context/AuthContext'

const State = () => {
  const [products, setProducts] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)


  const fetchProducts = useCallback(async () => {
    try {
      const fetched = await request('/api/product', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(fetched)
    } catch (e) { }
  }, [token, request])

  // products={products}
  // console.log(localStorage);

  // const dataState = async () => {
  //   try {
  //     const data = await request('/api/auth/login', 'POST', { ...form })
  //     auth.login(data.token, data.userId, data.userEmail, data.userRole)
  //   } catch (e) { }
  // }

  // return (

  // )
}


export default State