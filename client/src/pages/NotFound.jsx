import { Link } from 'react-router-dom'
import { FiAlertTriangle } from 'react-icons/fi'

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <FiAlertTriangle className="mx-auto text-amber-500 mb-4" size={64} />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound