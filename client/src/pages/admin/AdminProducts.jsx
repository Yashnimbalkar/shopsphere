import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'
import { fetchProducts, deleteProduct } from '../../services/productService'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  function loadProducts() {
    setLoading(true)
    fetchProducts({ limit: 100 })
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false))
  }

// eslint-disable-next-line react-hooks/set-state-in-effect -- standard loading-state pattern for data fetching
  useEffect(loadProducts, [])

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await deleteProduct(id)
      loadProducts()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md"
        >
          <FiPlus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-2xl">{p.image}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">₹{p.price}</td>
                <td className="px-4 py-3">
                  <span className={p.stock_quantity === 0 ? 'text-red-500' : p.stock_quantity < 10 ? 'text-amber-500' : 'text-gray-700'}>
                    {p.stock_quantity}
                  </span>
                </td>
                <td className="px-4 py-3">{p.category_name}</td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/products/${p.id}/edit`} className="text-emerald-600 hover:text-emerald-700 inline-block mr-3">
                    <FiEdit2 size={16} />
                  </Link>
                  <button onClick={() => handleDelete(p.id, p.name)} className="text-red-500 hover:text-red-600">
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

export default AdminProducts