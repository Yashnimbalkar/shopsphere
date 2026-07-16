const categories = ['electronics', 'fashion', 'home-kitchen', 'sports']

function ProductFilters({ filters, onFilterChange, brandOptions = [] }) {
  const toggleCategory = (cat) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat]
    onFilterChange({ ...filters, categories: updated })
  }

  const toggleBrand = (brand) => {
    const updated = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    onFilterChange({ ...filters, brands: updated })
  }

  return (
    <aside className="w-full md:w-56 shrink-0 bg-white rounded-lg shadow-sm p-4 h-fit">
      <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
      <div className="space-y-2 mb-6">
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-emerald-600"
            />
            <span className="capitalize">{cat.replace('-', ' & ')}</span>
          </label>
        ))}
      </div>

      <h3 className="font-semibold text-gray-800 mb-3">Brand</h3>
      <div className="space-y-2 mb-6">
        {brandOptions.map((brand) => (
          <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              className="accent-emerald-600"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      <h3 className="font-semibold text-gray-800 mb-3">Max Price: ₹{filters.maxPrice}</h3>
      <input
        type="range"
        min="500"
        max="5000"
        step="100"
        value={filters.maxPrice}
        onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
        className="w-full accent-emerald-600"
      />

      <button
        onClick={() => onFilterChange({ categories: [], brands: [], maxPrice: 5000 })}
        className="mt-6 text-sm text-emerald-600 hover:underline"
      >
        Clear all filters
      </button>
    </aside>
  )
}

export default ProductFilters