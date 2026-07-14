function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col animate-pulse">
      <div className="h-40 bg-gray-200 rounded-md mb-3" />
      <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-1" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
      <div className="h-9 bg-gray-200 rounded-md mt-auto" />
    </div>
  )
}

export default ProductCardSkeleton