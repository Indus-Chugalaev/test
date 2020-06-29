import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../Loader'
// import { ProfileInfo } from './profileInfo/ProfileInfo'

export const Profile = (props) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  // const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()

  // const [user, setUser] = useState([])
  // // const [setUser] = useState([])
  // const userId = user._id

  // const fetchUser = useCallback(async () => {
  //   try {
  //     const fetched = await request(
  //       `/api/profile/${userId}`,
  //       'GET',
  //       null, {
  //       Authorization: `Bearer ${token}`
  //     })
  //     setUser(fetched)
  //   } catch (e) { }
  // }, [token, request, setUser, userId])



  // useEffect(() => {
  //   fetchUser()
  // }, [fetchUser])

  if (loading) {
    return <Loader />
  }
  // console.log(props);


  return (
    <div>
      <div>
        E-mail: {props.store.state.user.email}
      </div>
      <div>
        Имя: {props.store.state.user.userName}
      </div>
      <div>
        Фамилия: {props.store.state.user.userLastName}
      </div>
      <div>
        Номер телефона: {props.store.state.user.userPhone}
      </div>
      <div>
        <a href="/" onClick={logoutHandler}>Выйти</a>
      </div>
    </div>
  )
}
