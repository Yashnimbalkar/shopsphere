const pool = require('../config/db')

async function getAddressesByUser(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC',
    [userId]
  )
  return rows
}

async function createAddress(userId, data) {
  const { fullName, phone, addressLine, city, state, postalCode, isDefault } = data

  if (isDefault) {
    await pool.query('UPDATE addresses SET is_default = FALSE WHERE user_id = ?', [userId])
  }

  const [result] = await pool.query(
    `INSERT INTO addresses (user_id, full_name, phone, address_line, city, state, postal_code, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, fullName, phone, addressLine, city, state, postalCode, !!isDefault]
  )
  return result.insertId
}

async function getAddressById(id, userId) {
  const [rows] = await pool.query('SELECT * FROM addresses WHERE id = ? AND user_id = ?', [id, userId])
  return rows[0]
}

module.exports = { getAddressesByUser, createAddress, getAddressById }