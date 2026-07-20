import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { fetchRelatedProducts } from '../services/productService'

function RelatedProducts({ productId }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard loading-state pattern for data fetching
    setLoading(true)
    fetchRelatedProducts(productId)
      .then(setProducts)
      .catch((err) => console.error('Failed to load related products:', err))
      .finally(() => setLoading(false))
  }, [productId])

  if (loading || products.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts