import api from './api'

export async function getCart() {
  const res = await api.get('/cart')
  return res.data.items
}

export async function addToCart(productId, quantity = 1) {
  const res = await api.post('/cart', { productId, quantity })
  return res.data.items
}

export async function updateCartItem(productId, quantity) {
  const res = await api.put(`/cart/${productId}`, { quantity })
  return res.data.items
}

export async function removeFromCart(productId) {
  const res = await api.delete(`/cart/${productId}`)
  return res.data.items
}

export async function clearCart() {
  const res = await api.delete('/cart')
  return res.data.items
}