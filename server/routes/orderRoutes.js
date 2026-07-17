const express = require('express')
const router = express.Router()
const { placeOrder, listMyOrders, getMyOrder } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)
router.post('/', placeOrder)
router.get('/', listMyOrders)
router.get('/:id', getMyOrder)

module.exports = router