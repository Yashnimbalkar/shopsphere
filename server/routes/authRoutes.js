const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')
const { registerValidationRules, loginValidationRules, validate } = require('../middleware/validators')

router.post('/register', registerValidationRules, validate, register)
router.post('/login', loginValidationRules, validate, login)

module.exports = router