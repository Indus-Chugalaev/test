import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userRole, setUserRole] = useState(null)

  const login = useCallback((jwtToken, id, email, role) => {
    setToken(jwtToken)
    setUserId(id)
    setUserEmail(email)
    setUserRole(role)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, userEmail: email, userRole: role, token: jwtToken
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserEmail(null)
    setUserRole(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.userEmail, data.userRole)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, userEmail, userRole, ready }
}
