import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi'
import { useAuth } from '../context/useAuth'
import { addToCart as addToCartApi } from '../services/cartService'
import { addToWishlist, removeFromWishlist } from '../services/wishlistService'
import { setCart } from '../redux/cartSlice'
import { setWishlist } from '../redux/wishlistSlice'

function ProductCard({ product }) {
  const { id, name, price, original_price, rating, review_count, image, stock_quantity } = product
  const inStock = stock_quantity > 0
  const { user } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)
  const [wishlistBusy, setWishlistBusy] = useState(false)

  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((item) => item.id === id)

  const discountPercent = original_price
    ? Math.round(((original_price - price) / original_price) * 100)
    : 0

  async function handleAddToCart(e) {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setAdding(true)
    try {
      const items = await addToCartApi(id, 1)
      dispatch(setCart(items))
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      setAdding(false)
    }
  }

  async function handleToggleWishlist(e) {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setWishlistBusy(true)
    try {
      const items = isWishlisted
        ? await removeFromWishlist(id)
        : await addToWishlist(id)
      dispatch(setWishlist(items))
    } catch (err) {
      console.error('Failed to update wishlist:', err)
    } finally {
      setWishlistBusy(false)
    }
  }

  return (
    <div className="relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col">
      <button
        onClick={handleToggleWishlist}
        disabled={wishlistBusy}
        className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Toggle wishlist"
      >
        <FiHeart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
      </button>

      <Link to={`/products/${id}`} className="flex flex-col flex-1">
        <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden mb-3">
          {image ? (
            image.startsWith('http') ? (
              <img src={image} alt={name} className="w-full h-full object-contain" />
            ) : (
              <span className="text-6xl">{image}</span>
            )
          ) : (
            <span className="text-6xl">📦</span>
          )}
        </div>

        {discountPercent > 0 && (
          <span className="self-start bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded mb-2">
            {discountPercent}% OFF
          </span>
        )}

        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{name}</h3>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <FiStar className="text-amber-500 fill-amber-500" size={14} />
          <span>{rating}</span>
          <span className="text-gray-400">({review_count})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          {original_price && (
            <span className="text-sm text-gray-400 line-through">₹{original_price}</span>
          )}
        </div>
      </Link>

      <div className="mt-auto">
        {inStock ? (
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium py-2 rounded-md transition-colors disabled:opacity-60"
          >
            <FiShoppingCart size={16} />
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 font-medium py-2 rounded-md cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard