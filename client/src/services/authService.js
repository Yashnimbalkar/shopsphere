import api from './api'

export async function registerUser(data) {
  const res = await api.post('/auth/register', data)
  return res.data
}

export async function loginUser(data) {
  const res = await api.post('/auth/login', data)
  return res.data
}

export async function getCurrentUser() {
  const res = await api.get('/auth/me')
  return res.data
}

export async function forgotPassword(email) {
  const res = await api.post('/auth/forgot-password', { email })
  return res.data
}

export async function resetPassword(token, password) {
  const res = await api.post(`/auth/reset-password/${token}`, { password })
  return res.data
}