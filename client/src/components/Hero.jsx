import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Everything You Need,
            <span className="text-emerald-400"> Delivered Fast</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-xl">
            Discover millions of products at unbeatable prices. Shop smarter with ShopSphere.
          </p>
          <Link
            to="/products"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Shop Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-emerald-700/30 rounded-full flex items-center justify-center text-6xl">
            🛍️
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero