import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
              <span className="hidden sm:inline text-sm text-gray-300">
                Hi, {user.name?.split(' ')[0] || user.email}
              </span>
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
          <Link to="/cart" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <FiShoppingCart size={20} />
            <span className="text-sm hidden sm:inline">Cart</span>
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