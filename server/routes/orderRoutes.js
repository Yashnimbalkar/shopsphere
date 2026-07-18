const express = require('express')
const router = express.Router()
const {
  placeOrder, listMyOrders, getMyOrder,
  adminListOrders, adminGetOrder, adminUpdateStatus,
} = require('../controllers/orderController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.use(protect)

router.post('/', placeOrder)
router.get('/', listMyOrders)
router.get('/admin/all', adminOnly, adminListOrders)
router.get('/admin/:id', adminOnly, adminGetOrder)
router.put('/admin/:id/status', adminOnly, adminUpdateStatus)
router.get('/:id', getMyOrder)

module.exports = router