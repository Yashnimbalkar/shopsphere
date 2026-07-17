const express = require('express')
const router = express.Router()
const { listAddresses, addAddress } = require('../controllers/addressController')
const { protect } = require('../middleware/authMiddleware')

router.use(protect)
router.get('/', listAddresses)
router.post('/', addAddress)

module.exports = router