import api from './api'

export async function validateCoupon(code, orderAmount) {
  const res = await api.post('/coupons/validate', { code, orderAmount })
  return res.data
}

export async function getAllCouponsAdmin() {
  const res = await api.get('/coupons')
  return res.data.coupons
}

export async function createCouponAdmin(data) {
  const res = await api.post('/coupons', data)
  return res.data
}

export async function deleteCouponAdmin(id) {
  const res = await api.delete(`/coupons/${id}`)
  return res.data
}

export async function toggleCouponAdmin(id, isActive) {
  const res = await api.put(`/coupons/${id}/toggle`, { isActive })
  return res.data
}