import React from 'react'
import { useHttp } from '../../../hooks/http.hook'
// import { AuthContext } from '../../../context/AuthContext'
import { Loader } from '../../../components/Loader'

export const RootPage = () => {
  const { loading,
    // request 
  } = useHttp()
  // const { token } = useContext(AuthContext)


  if (loading) {
    return <Loader />
  }

  return (
    <div>
      RootPage
    </div>
  )
}
