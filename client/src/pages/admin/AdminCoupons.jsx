import { useState, useEffect } from 'react'
import { FiTrash2, FiPlus } from 'react-icons/fi'
import { getAllCouponsAdmin, createCouponAdmin, deleteCouponAdmin, toggleCouponAdmin } from '../../services/couponService'

const emptyForm = { code: '', discountType: 'percentage', discountValue: '', minOrderAmount: '', maxUses: '', expiresAt: '' }

function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  function load() {
    getAllCouponsAdmin().then(setCoupons)
  }
  useEffect(load, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError('')
    try {
      await createCouponAdmin(form)
      setForm(emptyForm)
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create coupon')
    }
  }

  async function handleDelete(id, code) {
    if (!window.confirm(`Delete coupon "${code}"?`)) return
    await deleteCouponAdmin(id)
    load()
  }

  async function handleToggle(id, isActive) {
    await toggleCouponAdmin(id, !isActive)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Coupons</h1>

      <form onSubmit={handleCreate} className="bg-white rounded-lg shadow-sm p-6 mb-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Code</label>
          <input name="code" value={form.code} onChange={handleChange} required placeholder="SAVE10"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Type</label>
          <select name="discountType" value={form.discountType} onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Value</label>
          <input type="number" name="discountValue" value={form.discountValue} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Min Order (₹)</label>
          <input type="number" name="minOrderAmount" value={form.minOrderAmount} onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Max Uses</label>
          <input type="number" name="maxUses" value={form.maxUses} onChange={handleChange} placeholder="Unlimited"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Expires</label>
          <input type="date" name="expiresAt" value={form.expiresAt} onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div className="col-span-2 md:col-span-3">
          <button type="submit" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md">
            <FiPlus size={16} /> Create Coupon
          </button>
        </div>
      </form>

      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Min Order</th>
              <th className="px-4 py-3">Usage</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{c.code}</td>
                <td className="px-4 py-3">
                  {c.discount_type === 'percentage' ? `${c.discount_value}%` : `₹${c.discount_value}`}
                </td>
                <td className="px-4 py-3">₹{c.min_order_amount}</td>
                <td className="px-4 py-3">{c.used_count}{c.max_uses ? ` / ${c.max_uses}` : ''}</td>
                <td className="px-4 py-3">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggle(c.id, c.is_active)}
                    className={`px-2 py-1 rounded text-xs font-medium ${c.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {c.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(c.id, c.code)} className="text-red-500 hover:text-red-600">
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCoupons