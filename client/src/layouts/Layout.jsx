import React from 'react'
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h1>Home</h1>
      <hr/>
      <Outlet />
    </div>
  )
}

export default Layout
