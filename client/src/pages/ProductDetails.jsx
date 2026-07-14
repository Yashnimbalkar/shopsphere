import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi'
import mockProducts from '../utils/mockProducts'

function ProductDetails() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Product not found</h2>
        <Link to="/products" className="text-emerald-600 hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  const { name, price, originalPrice, rating, reviewCount, image, inStock, brand, description } = product

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-emerald-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg h-96 text-9xl">
          {image}
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 uppercase mb-1">{brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <FiStar className="text-amber-500 fill-amber-500" size={18} />
            <span className="font-medium text-gray-700">{rating}</span>
            <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">₹{price}</span>
            {originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                <span className="text-emerald-600 font-semibold">{discountPercent}% off</span>
              </>
            )}
          </div>

          <p className={`text-sm font-medium mb-6 ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          {inStock && (
            <>
              {/* Quantity selector */}
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
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
              </div>

              <button className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-3 rounded-md transition-colors w-full md:w-auto">
                <FiShoppingCart size={18} />
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails