const pool = require('../config/db')

// Get or create a cart for a user — every user gets exactly one, created on first use
async function getOrCreateCart(userId) {
  const [existing] = await pool.query('SELECT * FROM cart WHERE user_id = ?', [userId])
  if (existing[0]) return existing[0]

  const [result] = await pool.query('INSERT INTO cart (user_id) VALUES (?)', [userId])
  return { id: result.insertId, user_id: userId }
}

// Get all items in a user's cart, joined with product info
async function getCartItems(cartId) {
  const [rows] = await pool.query(
    `SELECT ci.id, ci.quantity, p.id AS product_id, p.name, p.price, p.image, p.stock_quantity
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = ?
     ORDER BY ci.id ASC`,
    [cartId]
  )
  return rows
}

// Add a product, or increase quantity if it's already in the cart
async function addOrUpdateItem(cartId, productId, quantity) {
  await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
    [cartId, productId, quantity]
  )
}

// Set an exact quantity (used by +/- steppers on the cart page)
async function setItemQuantity(cartId, productId, quantity) {
  await pool.query(
    'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
    [quantity, cartId, productId]
  )
}

async function removeItem(cartId, productId) {
  await pool.query('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId])
}

async function clearCartItems(cartId) {
  await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId])
}

module.exports = {
  getOrCreateCart,
  getCartItems,
  addOrUpdateItem,
  setItemQuantity,
  removeItem,
  clearCartItems,
}