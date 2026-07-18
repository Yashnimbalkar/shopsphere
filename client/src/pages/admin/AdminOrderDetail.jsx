import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderByIdAdmin, updateOrderStatus } from '../../services/orderService'

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

function AdminOrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [saving, setSaving] = useState(false)

  function load() {
    getOrderByIdAdmin(id).then(setOrder)
  }
  useEffect(load, [id])

  async function handleStatusChange(e) {
    setSaving(true)
    try {
      await updateOrderStatus(id, e.target.value)
      load()
    } catch {
      alert('Failed to update status')
    } finally {
      setSaving(false)
    }
  }

  if (!order) return <p className="text-gray-500">Loading...</p>

  return (
    <div className="max-w-3xl">
      <Link to="/admin/orders" className="text-sm text-emerald-600 hover:underline mb-4 inline-block">
        ← Back to Orders
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order #{order.id}</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium text-gray-800">{order.customer_name} ({order.customer_email})</p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Status</label>
            <select value={order.status} onChange={handleStatusChange} disabled={saving}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm capitalize">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500">Payment: <span className="capitalize font-medium text-gray-700">{order.payment_method}</span></p>
        <p className="text-sm text-gray-500">Placed: {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Items</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
            <span>{item.product_name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-gray-900 pt-4 mt-2 border-t border-gray-200">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetail