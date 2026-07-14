function SortDropdown({ sortBy, onSortChange }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
    >
      <option value="relevance">Sort: Relevance</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Avg. Customer Rating</option>
    </select>
  )
}

export default SortDropdown