const pool = require('../config/db')

async function createOrder(userId, { addressId, subtotal, shipping, tax, total, paymentMethod, transactionId, couponCode, discountAmount, items }) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, address_id, subtotal, shipping, tax, total, payment_method, transaction_id, coupon_code, discount_amount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, addressId, subtotal, shipping, tax, total, paymentMethod, transactionId, couponCode || null, discountAmount || 0]
    )
    const orderId = orderResult.insertId

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.price, item.quantity]
      )
      await connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.product_id]
      )
    }

    await connection.query('DELETE FROM cart_items WHERE cart_id = (SELECT id FROM cart WHERE user_id = ?)', [userId])

    await connection.commit()
    return orderId
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

async function getOrdersByUser(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  )
  return rows
}

async function getOrderById(orderId, userId) {
  const [orderRows] = await pool.query(
    'SELECT * FROM orders WHERE id = ? AND user_id = ?',
    [orderId, userId]
  )
  if (!orderRows[0]) return null

  const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId])
  return { ...orderRows[0], items }
}

async function getAllOrders() {
  const [rows] = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.email AS customer_email
     FROM orders o JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC`
  )
  return rows
}

async function updateOrderStatus(orderId, status) {
  await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId])
}

async function getAnyOrderById(orderId) {
  const [orderRows] = await pool.query(
    `SELECT o.*, u.name AS customer_name, u.email AS customer_email
     FROM orders o JOIN users u ON o.user_id = u.id WHERE o.id = ?`,
    [orderId]
  )
  if (!orderRows[0]) return null
  const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId])
  return { ...orderRows[0], items }
}

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getAnyOrderById,
}