import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiLogOut, FiHeart, FiMoon, FiSun } from 'react-icons/fi'
import { useAuth } from '../context/useAuth'
import { useTheme } from '../context/useTheme'

function Navbar() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-emerald-400 whitespace-nowrap">
          ShopSphere
        </Link>

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

        <div className="flex items-center gap-5 ml-auto">
          {user ? (
            <>
              <Link to="/profile" className="hidden sm:inline text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                Hi, {user.name?.split(' ')[0] || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
              >
                <FiLogOut size={20} />
                <span className="text-sm hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <FiUser size={20} />
              <span className="text-sm">Account</span>
            </Link>
          )}

          <Link to="/wishlist" className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <FiHeart size={20} />
          </Link>

          <button onClick={toggleDarkMode} className="hover:text-emerald-400 transition-colors" aria-label="Toggle dark mode">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <Link to="/cart" className="relative flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <FiShoppingCart size={20} />
            <span className="text-sm hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="md:hidden">
            <FiMenu size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar