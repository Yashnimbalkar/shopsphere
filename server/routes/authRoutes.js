const express = require('express')
const router = express.Router()
const { register } = require('../controllers/authController')
const { registerValidationRules, validate } = require('../middleware/validators')

router.post('/register', registerValidationRules, validate, register)

module.exports = router