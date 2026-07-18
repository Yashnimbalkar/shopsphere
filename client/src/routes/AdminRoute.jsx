import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function AdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>
  }
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />

  return children
}

export default AdminRoute