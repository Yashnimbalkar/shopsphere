const { createOrder, getOrdersByUser, getOrderById, getAllOrders, updateOrderStatus, getAnyOrderById, getOrderOwnerAndId } = require('../models/orderModel')
const { getAddressById } = require('../models/addressModel')
const { getCartItems, getOrCreateCart } = require('../models/cartModel')
const { findValidCoupon, incrementCouponUsage } = require('../models/couponModel')
const { createNotification } = require('../models/notificationModel')

async function placeOrder(req, res) {
  try {
    const { addressId, paymentMethod, transactionId, couponCode } = req.body

    const address = await getAddressById(addressId, req.user.id)
    if (!address) {
      return res.status(400).json({ message: 'Invalid shipping address' })
    }

    const cart = await getOrCreateCart(req.user.id)
    const items = await getCartItems(cart.id)

    if (items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' })
    }

    for (const item of items) {
      if (item.quantity > item.stock_quantity) {
        return res.status(400).json({ message: `Not enough stock for ${item.name}` })
      }
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shipping = subtotal > 0 && subtotal < 500 ? 49 : 0
    const tax = Number((subtotal * 0.05).toFixed(2))

    let discountAmount = 0
    let appliedCouponCode = null
    let coupon = null

    if (couponCode) {
      coupon = await findValidCoupon(couponCode, subtotal)
      if (!coupon) {
        return res.status(400).json({ message: 'Invalid or expired coupon code' })
      }
      discountAmount =
        coupon.discount_type === 'percentage'
          ? Number(((subtotal * coupon.discount_value) / 100).toFixed(2))
          : Number(coupon.discount_value)
      discountAmount = Math.min(discountAmount, subtotal)
      appliedCouponCode = coupon.code
    }

    const total = Number((subtotal + shipping + tax - discountAmount).toFixed(2))

    const orderId = await createOrder(req.user.id, {
      addressId,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod: paymentMethod || 'cod',
      transactionId: transactionId || null,
      couponCode: appliedCouponCode,
      discountAmount,
      items,
    })

    if (coupon) {
      await incrementCouponUsage(coupon.id)
    }

    await createNotification(
      req.user.id,
      'Order Placed',
      `Your order #${orderId} for ₹${total} has been placed successfully.`,
      'order'
    )

    res.status(201).json({ message: 'Order placed successfully', orderId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error placing order' })
  }
}

async function listMyOrders(req, res) {
  try {
    const orders = await getOrdersByUser(req.user.id)
    res.status(200).json({ orders })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching orders' })
  }
}

async function getMyOrder(req, res) {
  try {
    const order = await getOrderById(req.params.id, req.user.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ order })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching order' })
  }
}

async function adminListOrders(req, res) {
  try {
    const orders = await getAllOrders()
    res.status(200).json({ orders })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching orders' })
  }
}

async function adminGetOrder(req, res) {
  try {
    const order = await getAnyOrderById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.status(200).json({ order })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching order' })
  }
}

async function adminUpdateStatus(req, res) {
  try {
    const { status } = req.body
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }
    await updateOrderStatus(req.params.id, status)

    const orderInfo = await getOrderOwnerAndId(req.params.id)
    if (orderInfo) {
      await createNotification(
        orderInfo.user_id,
        'Order Status Updated',
        `Your order #${req.params.id} is now "${status}".`,
        'order'
      )
    }

    res.status(200).json({ message: 'Order status updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error updating order' })
  }
}

module.exports = {
  placeOrder,
  listMyOrders,
  getMyOrder,
  adminListOrders,
  adminGetOrder,
  adminUpdateStatus,
}