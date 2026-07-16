import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import ProductFilters from '../components/ProductFilters'
import SortDropdown from '../components/SortDropdown'
import { fetchProducts, fetchBrands } from '../services/productService'

function Products() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category')

  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    brands: [],
    maxPrice: 5000,
  })
  const [sortBy, setSortBy] = useState('relevance')
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [allBrands, setAllBrands] = useState([])

  // Load the full brand list once, for the filter sidebar checkboxes
  useEffect(() => {
    fetchBrands().then(setAllBrands).catch(console.error)
  }, [])

  // Refetch products whenever filters, sort, or page change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard loading-state pattern for data fetching
    setLoading(true)
    const params = {
      category: filters.categories[0] || undefined, // API supports one category at a time
      brand: filters.brands[0] || undefined,
      maxPrice: filters.maxPrice,
      sortBy,
      page,
      limit: 8,
    }

    fetchProducts(params)
      .then((data) => {
        setProducts(data.products)
        setPagination(data.pagination)
      })
      .catch((err) => console.error('Failed to load products:', err))
      .finally(() => setLoading(false))
  }, [filters, sortBy, page])

  // Reset to page 1 whenever filters or sort change (not on page change itself)
  function handleFilterChange(newFilters) {
    setFilters(newFilters)
    setPage(1)
  }

  function handleSortChange(newSort) {
    setSortBy(newSort)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} brandOptions={allBrands} />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {loading ? 'Loading...' : `${pagination.total} product${pagination.total !== 1 ? 's' : ''} found`}
            </p>
            <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination controls */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm disabled:opacity-40 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm disabled:opacity-40 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
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