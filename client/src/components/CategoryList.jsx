import { Link } from 'react-router-dom'

const categories = [
  { name: 'Electronics', emoji: '💻', slug: 'electronics' },
  { name: 'Fashion', emoji: '👗', slug: 'fashion' },
  { name: 'Home & Kitchen', emoji: '🏠', slug: 'home-kitchen' },
  { name: 'Beauty', emoji: '💄', slug: 'beauty' },
  { name: 'Sports', emoji: '⚽', slug: 'sports' },
  { name: 'Books', emoji: '📚', slug: 'books' },
  { name: 'Toys', emoji: '🧸', slug: 'toys' },
  { name: 'Grocery', emoji: '🛒', slug: 'grocery' },
]

function CategoryList() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className="text-sm font-medium text-gray-700 text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryList