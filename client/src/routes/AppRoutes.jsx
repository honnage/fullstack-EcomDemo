import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/shop'
import Cart from '../pages/Cart'
import History from '../pages/History'
import Checkout from '../pages/Checkout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Layout from '../layouts/Layout'
import LayoutAdmin from '../layouts/LayoutAdmins';
import LayoutUser from '../layouts/Layoutuser'
import Dashboard from '../pages/Admin/Dashborad'
import Category from '../pages/Admin/Category'
import Product from '../pages/Admin/Product'
import Manage from '../pages/Admin/Manage'
import HomeUser from '../pages/User/HomeUser'

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
      { path: 'manage', element: <Manage /> },
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
