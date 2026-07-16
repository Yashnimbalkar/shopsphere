import { useAuth } from '../context/useAuth'
import { FiUser, FiMail, FiShield } from 'react-icons/fi'

function Profile() {
  const { user } = useAuth()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <FiUser className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Full Name</p>
            <p className="text-gray-800 font-medium">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiMail className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiShield className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">Account Type</p>
            <p className="text-gray-800 font-medium capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile