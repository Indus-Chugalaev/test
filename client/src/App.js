import React, { useState, useCallback, useEffect, useContext } from 'react'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/navigation/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import './App.css'
import state from './redux/state'
import { State1 } from './redux/state'
import { useHttp } from './hooks/http.hook'

function App() {
  // console.log(1);

  // console.log(state);
  // console.log(55);

  // console.log(State1());



  const { token, login, logout, userId, userEmail, userRole, ready } = useAuth()
  const isAuthenticated = !!token
  // const routes = useRoutes(isAuthenticated, state)

  // start store
  // start state
  // start {products}
  const [products, setProducts] = useState([])
  const { request } = useHttp()
  const fetchProducts = useCallback(async () => {
    try {
      const fetched = await request('/api/product', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(fetched)
    } catch (e) { }
  }, [token, request])
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
  // end {services}

  // start {clients}
  const [clients, setClients] = useState([])
  const fetchClients = useCallback(async () => {
    try {
      const fetched = await request('/api/user', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClients(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])
  // end {clients}

  // start {orders}
  const [orders, setOrders] = useState([])
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
  // end {orders}

  // start {appointments}
  const [appointments, setAppointments] = useState([])
  const fetchAppointments = useCallback(async () => {
    try {
      const fetched = await request('/api/appointment', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setAppointments(fetched)
    } catch (e) { }
  }, [token, request])
  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])
  // end {appointments}

  // start {carts}
  const [carts, setCarts] = useState([])
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
  // end {carts}

  // start {user}
  const [user, setUser] = useState([])
  // const userId = user._id
  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/profile/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUser(fetched)
    } catch (e) { }
  }, [token, request, userId])
  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  // end {user}


  let state = {
    products,
    services,
    clients,
    orders,
    appointments,
    carts,
    user
  }
  // end state



  let store = {
    state,
  }


  const routes = useRoutes(isAuthenticated, store)






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
