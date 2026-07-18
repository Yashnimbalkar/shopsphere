const pool = require('../config/db')

async function getStats() {
  const [[{ totalRevenue }]] = await pool.query(
    "SELECT COALESCE(SUM(total), 0) AS totalRevenue FROM orders WHERE status != 'cancelled'"
  )
  const [[{ totalOrders }]] = await pool.query('SELECT COUNT(*) AS totalOrders FROM orders')
  const [[{ totalProducts }]] = await pool.query('SELECT COUNT(*) AS totalProducts FROM products')
  const [[{ totalCustomers }]] = await pool.query("SELECT COUNT(*) AS totalCustomers FROM users WHERE role = 'customer'")

  return { totalRevenue, totalOrders, totalProducts, totalCustomers }
}

async function getTopProducts() {
  const [rows] = await pool.query(`
    SELECT p.name, p.image, SUM(oi.quantity) AS unitsSold, SUM(oi.price * oi.quantity) AS revenue
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    GROUP BY oi.product_id
    ORDER BY unitsSold DESC
    LIMIT 5
  `)
  return rows
}

async function getLowStockProducts() {
  const [rows] = await pool.query(
    'SELECT id, name, stock_quantity FROM products WHERE stock_quantity < 10 ORDER BY stock_quantity ASC'
  )
  return rows
}

module.exports = { getStats, getTopProducts, getLowStockProducts }