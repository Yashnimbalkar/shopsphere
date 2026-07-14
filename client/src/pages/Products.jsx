import { useState, useMemo, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import ProductFilters from '../components/ProductFilters'
import SortDropdown from '../components/SortDropdown'
import mockProducts from '../utils/mockProducts'

function Products() {
  const [filters, setFilters] = useState({ categories: [], brands: [], maxPrice: 5000 })
  const [sortBy, setSortBy] = useState('relevance')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulates a network request — remove this once real API calls exist (Week 3)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter((p) => {
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(p.category)
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(p.brand)
      const matchesPrice = p.price <= filters.maxPrice
      return matchesCategory && matchesBrand && matchesPrice
    })

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)

    return result
  }, [filters, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilters filters={filters} onFilterChange={setFilters} />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </p>
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-16">
              No products match your filters. Try clearing some.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products