import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Login from '../pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <Login /> },
    ],
  },
])

export default router