import { useParams, Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

function OrderConfirmation() {
  const { orderId } = useParams()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <FiCheckCircle className="mx-auto text-emerald-500 mb-4" size={64} />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-500 mb-6">
        Your order <span className="font-semibold text-gray-700">#{orderId}</span> has been confirmed.
      </p>
      <Link
        to="/products"
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default OrderConfirmation