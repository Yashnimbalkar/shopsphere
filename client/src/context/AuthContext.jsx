import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from './auth-context'
import { getCurrentUser } from '../services/authService'
import { getCart } from '../services/cartService'
import { setCart, clearCart } from '../redux/cartSlice'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => !!localStorage.getItem('token'))
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    getCurrentUser()
      .then((data) => {
        setUser(data.user)
        return getCart()
      })
      .then((items) => dispatch(setCart(items)))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [dispatch])

  function login(token, userData) {
    localStorage.setItem('token', token)
    setUser(userData)
    getCart().then((items) => dispatch(setCart(items)))
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    dispatch(clearCart())
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}