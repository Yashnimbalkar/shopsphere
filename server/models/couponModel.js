const pool = require('../config/db')

async function getAllCoupons() {
  const [rows] = await pool.query('SELECT * FROM coupons ORDER BY created_at DESC')
  return rows
}

async function createCoupon(data) {
  const { code, discountType, discountValue, minOrderAmount, maxUses, expiresAt } = data
  const [result] = await pool.query(
    `INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_uses, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [code.toUpperCase(), discountType, discountValue, minOrderAmount || 0, maxUses || null, expiresAt || null]
  )
  return result.insertId
}

async function deleteCoupon(id) {
  await pool.query('DELETE FROM coupons WHERE id = ?', [id])
}

async function toggleCouponActive(id, isActive) {
  await pool.query('UPDATE coupons SET is_active = ? WHERE id = ?', [isActive, id])
}

async function findValidCoupon(code, orderAmount) {
  const [rows] = await pool.query(
    `SELECT * FROM coupons
     WHERE code = ?
       AND is_active = TRUE
       AND (expires_at IS NULL OR expires_at >= CURDATE())
       AND (max_uses IS NULL OR used_count < max_uses)
       AND min_order_amount <= ?`,
    [code.toUpperCase(), orderAmount]
  )
  return rows[0]
}

async function incrementCouponUsage(id) {
  await pool.query('UPDATE coupons SET used_count = used_count + 1 WHERE id = ?', [id])
}

module.exports = {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  toggleCouponActive,
  findValidCoupon,
  incrementCouponUsage,
}