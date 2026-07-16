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