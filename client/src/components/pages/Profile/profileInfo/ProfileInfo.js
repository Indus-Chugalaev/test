import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../../../../hooks/http.hook'
import { AuthContext } from '../../../../context/AuthContext'
import { Loader } from '../../../Loader'

export const ProfileInfo = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

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
    <>
      <div>
        E-mail: {user.email}
      </div>
      <div>
        Имя: {user.userName}
      </div>
      <div>
        Фамилия: {user.userLastName}
      </div>
      <div>
        Номер телефона: {user.userPhone}
      </div>
    </>
  )
}
