const pool = require('../config/db')

// Find a user by email — used during register (check duplicates) and login
async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  return rows[0]
}

// Create a new user — password must already be hashed before calling this
async function createUser({ name, email, hashedPassword }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  )
  return result.insertId
}

module.exports = { findUserByEmail, createUser }