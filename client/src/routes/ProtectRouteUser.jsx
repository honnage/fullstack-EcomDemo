/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import useEcomStore from '../store/ecom-store'

import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectRouteUser = ({element}) => {
  const [ok, setOk] = useState(false)
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)
  // console.log(user, token)

  useEffect(() => {
    if (user && token) {
      currentUser(token) 
      .then((res) => {
        // console.log(res)
        setOk(true)
      })
      .catch((err) => {
        // console.log(err)
        setOk(false)
      })
    }
  }, [])

  return ok ? element : <LoadingToRedirect/>
}

export default ProtectRouteUser
