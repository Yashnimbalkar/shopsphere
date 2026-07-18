import { useState, useEffect } from 'react'
import { FiTrash2, FiPlus } from 'react-icons/fi'
import { fetchCategories, createCategory, deleteCategory } from '../../services/productService'

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', slug: '', icon: '' })
  const [error, setError] = useState('')

  function load() {
    fetchCategories().then(setCategories)
  }
  useEffect(load, [])

  async function handleAdd(e) {
    e.preventDefault()
    setError('')
    try {
      await createCategory(form)
      setForm({ name: '', slug: '', icon: '' })
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category')
    }
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete "${name}"?`)) return
    try {
      await deleteCategory(id)
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete category')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Categories</h1>

      <form onSubmit={handleAdd} className="bg-white rounded-lg shadow-sm p-6 mb-6 flex gap-3 items-end flex-wrap">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Slug</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Icon (emoji)</label>
          <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-20" />
        </div>
        <button type="submit" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md">
          <FiPlus size={16} /> Add
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md mb-4">{error}</div>}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr><th className="px-4 py-3">Icon</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="px-4 py-3 text-xl">{c.icon}</td>
                <td className="px-4 py-3">{c.name}</td>
                <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(c.id, c.name)} className="text-red-500 hover:text-red-600">
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

export default AdminCategories