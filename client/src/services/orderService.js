import api from './api'

export async function placeOrder(data) {
  const res = await api.post('/orders', data)
  return res.data
}

export async function getMyOrders() {
  const res = await api.get('/orders')
  return res.data.orders
}

export async function getOrderById(id) {
  const res = await api.get(`/orders/${id}`)
  return res.data.order
}

export async function getAllOrdersAdmin() {
  const res = await api.get('/orders/admin/all')
  return res.data.orders
}
export async function getOrderByIdAdmin(id) {
  const res = await api.get(`/orders/admin/${id}`)
  return res.data.order
}
export async function updateOrderStatus(id, status) {
  const res = await api.put(`/orders/admin/${id}/status`, { status })
  return res.data
}