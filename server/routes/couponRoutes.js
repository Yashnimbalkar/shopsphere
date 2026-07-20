const express = require('express')
const router = express.Router()
const {
  adminListCoupons,
  adminCreateCoupon,
  adminDeleteCoupon,
  adminToggleCoupon,
  validateCoupon,
} = require('../controllers/couponController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.post('/validate', protect, validateCoupon)

router.get('/', protect, adminOnly, adminListCoupons)
router.post('/', protect, adminOnly, adminCreateCoupon)
router.delete('/:id', protect, adminOnly, adminDeleteCoupon)
router.put('/:id/toggle', protect, adminOnly, adminToggleCoupon)

module.exports = router