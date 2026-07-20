const {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
  toggleCouponActive,
  findValidCoupon,
} = require('../models/couponModel')

async function adminListCoupons(req, res) {
  try {
    const coupons = await getAllCoupons()
    res.status(200).json({ coupons })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching coupons' })
  }
}

async function adminCreateCoupon(req, res) {
  try {
    const id = await createCoupon(req.body)
    res.status(201).json({ message: 'Coupon created', id })
  } catch (err) {
    console.error(err)
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Coupon code already exists' })
    res.status(500).json({ message: 'Server error creating coupon' })
  }
}

async function adminDeleteCoupon(req, res) {
  try {
    await deleteCoupon(req.params.id)
    res.status(200).json({ message: 'Coupon deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error deleting coupon' })
  }
}

async function adminToggleCoupon(req, res) {
  try {
    const { isActive } = req.body
    await toggleCouponActive(req.params.id, isActive)
    res.status(200).json({ message: 'Coupon updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error updating coupon' })
  }
}

async function validateCoupon(req, res) {
  try {
    const { code, orderAmount } = req.body
    const coupon = await findValidCoupon(code, orderAmount)
    if (!coupon) {
      return res.status(400).json({ message: 'Invalid or expired coupon code' })
    }

    const discount =
      coupon.discount_type === 'percentage'
        ? Number(((orderAmount * coupon.discount_value) / 100).toFixed(2))
        : Number(coupon.discount_value)

    res.status(200).json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value,
      discountAmount: Math.min(discount, orderAmount),
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error validating coupon' })
  }
}

module.exports = {
  adminListCoupons,
  adminCreateCoupon,
  adminDeleteCoupon,
  adminToggleCoupon,
  validateCoupon,
}