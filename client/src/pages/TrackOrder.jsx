import { Link } from 'react-router-dom'

function TrackOrder() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Track Your Order</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        You can view the status of all your orders from your order history.
      </p>
      <Link to="/my-orders" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md transition-colors">
        View My Orders
      </Link>
    </div>
  )
}

export default TrackOrder