import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    { path: '/', element: <h1>Home Page</h1>},
    { path: 'shop', element: <h1>shop page</h1>},

])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default AppRoutes
