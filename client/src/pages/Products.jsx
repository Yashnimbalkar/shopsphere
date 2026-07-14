import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import SortDropdown from '../components/SortDropdown'
import mockProducts from '../utils/mockProducts'

function Products() {
  const [filters, setFilters] = useState({ categories: [], brands: [], maxPrice: 5000 })
  const [sortBy, setSortBy] = useState('relevance')

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
              {filteredProducts.length} product{filteredProducts.length !== 1 && 's'} found
            </p>
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {filteredProducts.length > 0 ? (
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