import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../services/orderService'

const statusColors = {
  pending: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  shipped: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch((err) => console.error('Failed to load orders:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-500 dark:text-gray-400">
        Loading your orders...
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">No orders yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Once you place an order, it'll show up here.</p>
        <Link to="/products" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md transition-colors">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Order #{order.id}</p>
                <p className="text-xs text-gray-400">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300 capitalize">
                Payment: {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Card'}
              </span>
              <span className="font-bold text-gray-900 dark:text-white">₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders