import { Link } from 'react-router-dom'

function RecentlyViewedList({ items }) {
  if (!items || items.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`}
            className="shrink-0 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
          >
            <div className="h-20 flex items-center justify-center bg-gray-50 dark:bg-slate-700 rounded-md overflow-hidden mb-2">
              {item.image && item.image.startsWith('http') ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-3xl">{item.image || '📦'}</span>
              )}
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">{item.name}</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">₹{item.price}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RecentlyViewedList