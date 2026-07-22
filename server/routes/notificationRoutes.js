const express = require('express')
const router = express.Router()
const { listNotifications, markAllAsRead, markOneAsRead } = require('../controllers/notificationController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/', listNotifications)
router.put('/read-all', markAllAsRead)
router.put('/:id/read', markOneAsRead)

module.exports = router