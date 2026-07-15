const bcrypt = require('bcrypt')
const { findUserByEmail, createUser } = require('../models/userModel')

async function register(req, res) {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }

    // Hash the password — 10 salt rounds is a solid balance of security vs speed
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

module.exports = { register }