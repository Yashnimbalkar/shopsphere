import api from './api'

export async function getDashboardData() {
  const res = await api.get('/admin/dashboard')
  return res.data
}

export async function getAllUsers() {
  const res = await api.get('/admin/users')
  return res.data.users
}