import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../page/Home'
import Shop from '../page/shop'
import Cart from '../page/Cart'
import History from '../page/History'
import Checkout from '../page/Checkout'
import Login from '../page/Auth/Login'
import Register from '../page/Auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmins';
import LayoutUser from '../layouts/Layoutuser'
import Dashboard from '../page/Admin/Dashborad'
import Category from '../page/Admin/Category'
import Product from '../page/Admin/Product'
import Manage from '../page/Admin/Manage'
import HomeUser from '../page//User/HomeUser'

import ProtectRouteUser from './ProtectRouteUser'
import ProtectRouteAdmin from './ProtectRouteAdmin'

const router = createBrowserRouter([
  { path: '/', 
    element: <Layout />,
    children: [
      { index: true, element: <Home />},
      { path: 'shop', element:  <Shop />},
      { path: 'cart', element:  <Cart />},
      { path: 'history', element:  <History />},
      { path: 'chekout', element:  <Checkout />},
      { path: 'login', element:  <Login />},
      { path: 'register', element:  <Register />},
    ]
  },
  {
    path: '/admin',
    // element: <LayoutAdmin />,
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard />},
      { path: 'category', element:  <Category />},
      { path: 'product', element:  <Product />},
      { path: 'manage', element:  <Manage />},
    ]
  },
  {
    path: '/user',
    // element: <LayoutUser/>,
    element: <ProtectRouteUser element={<LayoutUser />} />,
    children: [
      { index: true, element: <HomeUser />},
    ]
  }
  
])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default AppRoutes
