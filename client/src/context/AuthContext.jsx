import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from './auth-context'
import { getCurrentUser } from '../services/authService'
import { getCart } from '../services/cartService'
import { getWishlist } from '../services/wishlistService'
import { setCart, clearCart } from '../redux/cartSlice'
import { setWishlist, clearWishlist } from '../redux/wishlistSlice'

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
        return Promise.all([getCart(), getWishlist()])
      })
      .then(([cartItems, wishlistItems]) => {
        dispatch(setCart(cartItems))
        dispatch(setWishlist(wishlistItems))
      })
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [dispatch])

  function login(token, userData) {
    localStorage.setItem('token', token)
    setUser(userData)
    Promise.all([getCart(), getWishlist()]).then(([cartItems, wishlistItems]) => {
      dispatch(setCart(cartItems))
      dispatch(setWishlist(wishlistItems))
    })
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    dispatch(clearCart())
    dispatch(clearWishlist())
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}