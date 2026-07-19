import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FiStar, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi'
import { fetchProductById } from '../services/productService'
import { addToCart as addToCartApi } from '../services/cartService'
import { setCart } from '../redux/cartSlice'
import { useAuth } from '../context/useAuth'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard loading-state pattern for data fetching
    setLoading(true)
    setNotFound(false)
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true)
        else console.error('Failed to load product:', err)
      })
      .finally(() => setLoading(false))
  }, [id])

  async function handleAddToCart() {
    if (!user) {
      navigate('/login')
      return
    }
    setAdding(true)
    try {
      const items = await addToCartApi(id, quantity)
      dispatch(setCart(items))
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading...
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Product not found</h2>
        <Link to="/products" className="text-emerald-600 hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  const { name, price, original_price, rating, review_count, image, stock_quantity, brand, description } = product
  const inStock = stock_quantity > 0
  const discountPercent = original_price
    ? Math.round(((original_price - price) / original_price) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-emerald-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg h-96 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-9xl">📦</span>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-500 uppercase mb-1">{brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <FiStar className="text-amber-500 fill-amber-500" size={18} />
            <span className="font-medium text-gray-700">{rating}</span>
            <span className="text-gray-400 text-sm">({review_count} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">₹{price}</span>
            {original_price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{original_price}</span>
                <span className="text-emerald-600 font-semibold">{discountPercent}% off</span>
              </>
            )}
          </div>

          <p className={`text-sm font-medium mb-6 ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>
            {inStock ? `In Stock (${stock_quantity} available)` : 'Out of Stock'}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          {inStock && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stock_quantity, q + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-3 rounded-md transition-colors w-full md:w-auto disabled:opacity-60"
              >
                <FiShoppingCart size={18} />
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails