const express = require('express')
const router = express.Router()
const { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController')
const {
  registerValidationRules,
  loginValidationRules,
  forgotPasswordValidationRules,
  resetPasswordValidationRules,
  validate,
} = require('../middleware/validators')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerValidationRules, validate, register)
router.post('/login', loginValidationRules, validate, login)
router.get('/me', protect, getMe)
router.post('/forgot-password', forgotPasswordValidationRules, validate, forgotPassword)
router.post('/reset-password/:token', resetPasswordValidationRules, validate, resetPassword)

module.exports = router