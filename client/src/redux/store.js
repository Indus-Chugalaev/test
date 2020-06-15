import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'

import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from '../routes'
import { useAuth } from '../hooks/auth.hook'
import { AuthContext } from '../context/AuthContext'

function Store() {
  const { token, login, logout, userId, userEmail, userRole, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)


  // start {products}
  const [products, setProducts] = useState([])
  const { loading, request } = useHttp()

  const fetchProducts = useCallback(async () => {
    try {
      const fetched = await request('/api/product', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(fetched)
    } catch (e) { }
  }, [token, request])

  // console.log(products);




  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // end {products}


  // start {services}

  const [services, setServices] = useState([])

  const fetchServices = useCallback(async () => {
    try {
      const fetched = await request('/api/service', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setServices(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  console.log(services);

  // end {services}

  let store = { products, services }

  // console.log(store);



}

export default Store
