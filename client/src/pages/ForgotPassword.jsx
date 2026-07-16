import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../services/authService'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [devLink, setDevLink] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setDevLink('')
    try {
      const data = await forgotPassword(email)
      setMessage(data.message)
      if (data.devResetLink) setDevLink(data.devResetLink) // dev-only, remove once real email is wired up
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        {message && (
          <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-md mb-4">
            {message}
          </div>
        )}

        {devLink && (
          <div className="bg-amber-50 text-amber-800 text-xs px-4 py-3 rounded-md mb-4 break-all">
            <strong>Dev mode only</strong> (remove once real email sending is set up):{' '}
            <Link to={devLink.replace('http://localhost:5173', '')} className="underline">
              {devLink}
            </Link>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-md transition-colors disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Remembered your password?{' '}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword