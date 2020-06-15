import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../Loader'
import { ProfileInfo } from './profileInfo/ProfileInfo'

export const Profile = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()

  const [user, setUser] = useState([])

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request('/api/profile/${userId}', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUser(fetched)
    } catch (e) { }
  }, [token, request])



  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) {
    return <Loader />
  }


  return (
    <div>
      <ProfileInfo />
      <div>
        <a href="/" onClick={logoutHandler}>Выйти</a>
      </div>
    </div>
  )
}
