import { useState, useEffect } from 'react'
import { FiDollarSign, FiShoppingBag, FiBox, FiUsers, FiAlertTriangle } from 'react-icons/fi'
import { getDashboardData } from '../../services/adminService'

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex items-center gap-4">
      <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getDashboardData().then(setData).catch(console.error)
  }, [])

  if (!data) return <p className="text-gray-500">Loading...</p>

  const { stats, topProducts, lowStock } = data

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FiDollarSign} label="Total Revenue" value={`₹${Number(stats.totalRevenue).toLocaleString()}`} />
        <StatCard icon={FiShoppingBag} label="Total Orders" value={stats.totalOrders} />
        <StatCard icon={FiBox} label="Total Products" value={stats.totalProducts} />
        <StatCard icon={FiUsers} label="Total Customers" value={stats.totalCustomers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Top Selling Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-400">No sales data yet.</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.image}</span>
                    <span>{p.name}</span>
                  </div>
                  <span className="text-gray-500">{p.unitsSold} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiAlertTriangle className="text-amber-500" size={18} />
            Low Stock Alerts
          </h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-gray-400">All products well stocked.</p>
          ) : (
            <div className="space-y-2">
              {lowStock.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className={p.stock_quantity === 0 ? 'text-red-500 font-medium' : 'text-amber-600'}>
                    {p.stock_quantity} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard