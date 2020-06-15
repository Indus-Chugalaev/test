import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from './hooks/http.hook'

import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navigation/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import './App.css'

function App() {
  const { token, login, logout, userId, userEmail, userRole, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  // // start store
  //   // start {products}
  //   const [products, setProducts] = useState([])
  //   const { loading, request } = useHttp()

  //   const fetchProducts = useCallback(async () => {
  //     try {
  //       const fetched = await request('/api/product', 'GET', null, {
  //         Authorization: `Bearer ${token}`
  //       })
  //       setProducts(fetched)
  //     } catch (e) { }
  //   }, [token, request])





  //   useEffect(() => {
  //     fetchProducts()
  //   }, [fetchProducts])

  //   // console.log(products);
  //   // end {products}


  //   // start {services}

  //   const [services, setServices] = useState([])

  //   const fetchServices = useCallback(async () => {
  //     try {
  //       const fetched = await request('/api/service', 'GET', null, {
  //         Authorization: `Bearer ${token}`
  //       })
  //       setServices(fetched)
  //     } catch (e) { }
  //   }, [token, request])

  //   useEffect(() => {
  //     fetchServices()
  //   }, [fetchServices])

  //   // console.log(services);

  //   // end {services}

  //   // start {carts}

  //   const [carts, setCarts] = useState([])

  //   const fetchCarts = useCallback(async () => {
  //     try {
  //       const fetched = await request('/api/cart', 'GET', null, {
  //         Authorization: `Bearer ${token}`
  //       })
  //       setCarts(fetched)
  //     } catch (e) { }
  //   }, [token, request])

  //   useEffect(() => {
  //     fetchCarts()
  //   }, [fetchCarts])

  //   // console.log(carts);

  //   // end {carts}

  //   let array = {products, services, carts}
  // let store = {array}
  //   console.log(store);

  //   // end store

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, userEmail, userRole, isAuthenticated
    }}>

      <Router>
        <div className="container">
          <div className="header">
            {isAuthenticated && <Navbar />}
          </div>
          <div className="main">
            {routes}
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
