const bcrypt = require('bcrypt')
const { findUserByEmail, createUser } = require('../models/userModel')
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

module.exports = { register, login }