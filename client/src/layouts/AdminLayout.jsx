import { Outlet, Link, useLocation } from 'react-router-dom'
import { FiGrid, FiBox, FiTag, FiShoppingBag, FiUsers } from 'react-icons/fi'


const navItems = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', exact: true },
  { to: '/admin/products', icon: FiBox, label: 'Products' },
  { to: '/admin/categories', icon: FiTag, label: 'Categories' },
  { to: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
  { to: '/admin/users', icon: FiUsers, label: 'Users' },
]

function AdminLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-slate-900 text-white shrink-0 min-h-screen">
        <div className="px-5 py-5 text-xl font-bold text-emerald-400 border-b border-slate-700">
          ShopSphere Admin
        </div>
        <nav className="py-4">
          {navItems.map(({ to, icon: Icon, label, exact }) => {
            const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="px-5 py-3 border-t border-slate-700 mt-4">
          <Link to="/" className="text-xs text-gray-400 hover:text-emerald-400">
            ← Back to Store
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout