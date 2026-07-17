const pool = require('../config/db')

async function getWishlist(userId) {
  const [rows] = await pool.query(
    `SELECT w.id AS wishlist_id, p.*
     FROM wishlist w
     JOIN products p ON w.product_id = p.id
     WHERE w.user_id = ?
     ORDER BY w.id DESC`,
    [userId]
  )
  return rows
}

async function addToWishlist(userId, productId) {
  await pool.query(
    'INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)',
    [userId, productId]
  )
}

async function removeFromWishlist(userId, productId) {
  await pool.query('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [userId, productId])
}

async function isInWishlist(userId, productId) {
  const [rows] = await pool.query(
    'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  )
  return rows.length > 0
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist, isInWishlist }