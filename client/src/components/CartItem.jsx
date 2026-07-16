import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

function CartItem({ item, onUpdateQuantity, onRemove, updating }) {
  const { product_id, name, price, image, quantity, stock_quantity } = item
  const lineTotal = (price * quantity).toFixed(2)

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-0">
      <Link to={`/products/${product_id}`} className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-md text-4xl shrink-0">
        {image}
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/products/${product_id}`} className="text-sm font-medium text-gray-800 hover:text-emerald-600 line-clamp-2">
          {name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">₹{price} each</p>
      </div>

      <div className="flex items-center border border-gray-300 rounded-md shrink-0">
        <button
          onClick={() => onUpdateQuantity(product_id, Math.max(1, quantity - 1))}
          disabled={updating || quantity <= 1}
          className="px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-40"
        >
          <FiMinus size={12} />
        </button>
        <span className="px-3 py-1.5 min-w-[2.5rem] text-center text-sm">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(product_id, Math.min(stock_quantity, quantity + 1))}
          disabled={updating || quantity >= stock_quantity}
          className="px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-40"
        >
          <FiPlus size={12} />
        </button>
      </div>

      <div className="w-20 text-right font-semibold text-gray-900 shrink-0">
        ₹{lineTotal}
      </div>

      <button
        onClick={() => onRemove(product_id)}
        disabled={updating}
        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
        aria-label="Remove item"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  )
}

export default CartItem