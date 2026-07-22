const pool = require('../config/db')

async function createNotification(userId, title, message, type = 'system') {
  await pool.query(
    'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
    [userId, title, message, type]
  )
}

async function getNotificationsByUser(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
    [userId]
  )
  return rows
}

async function getUnreadCount(userId) {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND is_read = FALSE',
    [userId]
  )
  return rows[0].count
}

async function markAllRead(userId) {
  await pool.query('UPDATE notifications SET is_read = TRUE WHERE user_id = ?', [userId])
}

async function markOneRead(id, userId) {
  await pool.query('UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?', [id, userId])
}

module.exports = {
  createNotification,
  getNotificationsByUser,
  getUnreadCount,
  markAllRead,
  markOneRead,
}