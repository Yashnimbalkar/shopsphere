import { Link } from 'react-router-dom'

function OrderSummary({ items }) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 && subtotal < 500 ? 49 : 0
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit w-full md:w-80 shrink-0">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-4 mb-6">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <Link
        to="/checkout"
        className={`block text-center font-semibold py-3 rounded-md transition-colors ${
          items.length > 0
            ? 'bg-amber-500 hover:bg-amber-600 text-gray-900'
            : 'bg-gray-200 text-gray-400 pointer-events-none'
        }`}
      >
        Proceed to Checkout
      </Link>

      {shipping > 0 && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
        </p>
      )}
    </div>
  )
}

export default OrderSummary