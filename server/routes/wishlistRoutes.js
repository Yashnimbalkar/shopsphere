const express = require('express')
const router = express.Router()
const { getMyWishlist, addItem, removeItem } = require('../controllers/wishlistController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)

router.get('/', getMyWishlist)
router.post('/', addItem)
router.delete('/:productId', removeItem)

module.exports = router