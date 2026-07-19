import api from './api'

export async function fetchProducts(params = {}) {
  const res = await api.get('/products', { params })
  return res.data // { products, pagination }
}

export async function fetchProductById(id) {
  const res = await api.get(`/products/${id}`)
  return res.data.product
}

export async function fetchCategories() {
  const res = await api.get('/products/categories')
  return res.data.categories
}

export async function fetchBrands() {
  const res = await api.get('/products/brands')
  return res.data.brands
}
export async function createProduct(data) {
  const res = await api.post('/products', data)
  return res.data
}

export async function updateProduct(id, data) {
  const res = await api.put(`/products/${id}`, data)
  return res.data
}

export async function deleteProduct(id) {
  const res = await api.delete(`/products/${id}`)
  return res.data
}

export async function createCategory(data) {
  const res = await api.post('/products/categories', data)
  return res.data
}
export async function updateCategory(id, data) {
  const res = await api.put(`/products/categories/${id}`, data)
  return res.data
}
export async function deleteCategory(id) {
  const res = await api.delete(`/products/categories/${id}`)
  return res.data
}

export async function uploadProductImage(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.url
}