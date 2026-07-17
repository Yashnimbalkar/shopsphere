import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiHeart } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/useAuth'

function Wishlist() {
  const { user } = useAuth()
  const items = useSelector((state) => state.wishlist.items)

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiHeart className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Please log in to view your wishlist</h2>
        <Link to="/login" className="text-emerald-600 hover:underline">
          Login
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FiHeart className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Tap the heart icon on any product to save it here.</p>
        <Link
          to="/products"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist