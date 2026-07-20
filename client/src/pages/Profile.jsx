import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { FiUser, FiMail, FiShield, FiPackage } from 'react-icons/fi'

function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">My Profile</h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <FiUser className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
            <p className="text-gray-800 dark:text-gray-100 font-medium">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiMail className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-gray-800 dark:text-gray-100 font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiShield className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Account Type</p>
            <p className="text-gray-800 dark:text-gray-100 font-medium capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <Link
        to="/my-orders"
        className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <FiPackage className="text-emerald-600" size={20} />
        <div>
          <p className="text-gray-800 dark:text-gray-100 font-medium">My Orders</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">View your order history and track status</p>
        </div>
      </Link>
    </div>
  )
}

export default Profile