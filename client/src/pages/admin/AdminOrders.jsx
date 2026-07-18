import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllOrdersAdmin } from '../../services/orderService'

const statusColors = {
  pending: 'bg-gray-100 text-gray-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-amber-100 text-amber-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllOrdersAdmin().then(setOrders).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3">Order #</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : orders.map((o) => (
              <tr key={o.id} className="border-t border-gray-100">
                <td className="px-4 py-3">#{o.id}</td>
                <td className="px-4 py-3">{o.customer_name}<br /><span className="text-xs text-gray-400">{o.customer_email}</span></td>
                <td className="px-4 py-3">₹{o.total}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${statusColors[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link to={`/admin/orders/${o.id}`} className="text-emerald-600 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrders