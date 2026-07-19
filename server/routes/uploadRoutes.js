const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const { uploadImage } = require('../controllers/uploadController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.post('/', protect, adminOnly, upload.single('image'), uploadImage)

module.exports = router