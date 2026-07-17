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