const {
  getNotificationsByUser,
  getUnreadCount,
  markAllRead,
  markOneRead,
} = require('../models/notificationModel')

async function listNotifications(req, res) {
  try {
    const notifications = await getNotificationsByUser(req.user.id)
    const unreadCount = await getUnreadCount(req.user.id)
    res.status(200).json({ notifications, unreadCount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching notifications' })
  }
}

async function markAllAsRead(req, res) {
  try {
    await markAllRead(req.user.id)
    res.status(200).json({ message: 'All notifications marked as read' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error updating notifications' })
  }
}

async function markOneAsRead(req, res) {
  try {
    await markOneRead(req.params.id, req.user.id)
    res.status(200).json({ message: 'Notification marked as read' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error updating notification' })
  }
}

module.exports = { listNotifications, markAllAsRead, markOneAsRead }