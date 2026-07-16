const bcrypt = require('bcrypt')
const crypto = require('crypto')
const {
  findUserByEmail,
  createUser,
  setResetToken,
  findUserByResetToken,
  updatePasswordAndClearToken,
} = require('../models/userModel')
const generateToken = require('../utils/generateToken')

async function register(req, res) {
  try {
    const { name, email, password } = req.body
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await createUser({ name, email, hashedPassword })
    res.status(201).json({
      message: 'Account created successfully',
      user: { id: userId, name, email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = generateToken(user)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error during login' })
  }
}

async function getMe(req, res) {
  res.status(200).json({ user: req.user })
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(200).json({
        message: 'If an account exists with that email, a reset link has been sent.',
      })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 60 * 60 * 1000)

    await setResetToken(email, token, expiry)

    const resetLink = `http://localhost:5173/reset-password/${token}`

    res.status(200).json({
      message: 'If an account exists with that email, a reset link has been sent.',
      devResetLink: resetLink,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error during password reset request' })
  }
}

async function resetPassword(req, res) {
  try {
    const { token } = req.params
    const { password } = req.body

    const user = await findUserByResetToken(token)
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await updatePasswordAndClearToken(user.id, hashedPassword)

    res.status(200).json({ message: 'Password reset successful. You can now log in.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error during password reset' })
  }
}

module.exports = { register, login, getMe, forgotPassword, resetPassword }  