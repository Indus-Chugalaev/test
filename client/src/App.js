import React from 'react'
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
