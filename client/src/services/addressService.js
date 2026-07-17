import api from './api'

export async function getAddresses() {
  const res = await api.get('/addresses')
  return res.data.addresses
}

export async function addAddress(data) {
  const res = await api.post('/addresses', data)
  return res.data
}