const pool = require('../config/db')

async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  return rows[0]
}

async function createUser({ name, email, hashedPassword }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  )
  return result.insertId
}

async function setResetToken(email, token, expiry) {
  await pool.query(
    'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
    [token, expiry, email]
  )
}

async function findUserByResetToken(token) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
    [token]
  )
  return rows[0]
}

async function updatePasswordAndClearToken(userId, hashedPassword) {
  await pool.query(
    'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
    [hashedPassword, userId]
  )
}

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC')
  return rows
}

module.exports = {
  findUserByEmail,
  createUser,
  setResetToken,
  findUserByResetToken,
  updatePasswordAndClearToken,
}