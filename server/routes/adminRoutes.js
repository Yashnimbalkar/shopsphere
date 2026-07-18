const express = require('express')
const router = express.Router()
const { getDashboardData, listUsers } = require('../controllers/dashboardController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.use(protect, adminOnly)
router.get('/dashboard', getDashboardData)
router.get('/users', listUsers)

module.exports = router