import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiShoppingBag } from 'react-icons/fi'
import { getCart, updateCartItem, removeFromCart } from '../services/cartService'
import { setCart, setCartLoading } from '../redux/cartSlice'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { useAuth } from '../context/useAuth'

function Cart() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const loading = useSelector((state) => state.cart.loading)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    if (!user) return
    dispatch(setCartLoading(true))
    getCart()
      .then((data) => dispatch(setCart(data)))
      .catch((err) => console.error('Failed to load cart:', err))
      .finally(() => dispatch(setCartLoading(false)))
  }, [user, dispatch])

  async function handleUpdateQuantity(productId, quantity) {
    setUpdatingId(productId)
    try {
      const updated = await updateCartItem(productId, quantity)
      dispatch(setCart(updated))
    } catch (err) {
      console.error('Failed to update quantity:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleRemove(productId) {
    setUpdatingId(productId)
    try {
      const updated = await removeFromCart(productId)
      dispatch(setCart(updated))
    } catch (err) {
      console.error('Failed to remove item:', err)
    } finally {
      setUpdatingId(null)
    }
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Please log in to view your cart</h2>
        <Link to="/login" className="text-emerald-600 hover:underline">
          Login
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading your cart...
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiShoppingBag className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Your Cart ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {items.map((item) => (
            <CartItem
              key={item.product_id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
              updating={updatingId === item.product_id}
            />
          ))}
        </div>

        <OrderSummary items={items} />
      </div>
    </div>
  )
}

export default Cart