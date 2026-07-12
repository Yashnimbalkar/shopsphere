import { FiSearch, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-emerald-400 whitespace-nowrap">
          ShopSphere
        </a>

        {/* Search bar */}
        <div className="flex-1 hidden md:flex items-center bg-white rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-3 py-2 text-gray-800 outline-none"
          />
          <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 text-gray-900 transition-colors">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-5 ml-auto">
          <a href="/login" className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <FiUser size={20} />
            <span className="text-sm">Account</span>
          </a>
          <a href="/cart" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <FiShoppingCart size={20} />
            <span className="text-sm hidden sm:inline">Cart</span>
          </a>
          <button className="md:hidden">
            <FiMenu size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar