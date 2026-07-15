const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const pool = require('./config/db')

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'ShopSphere API is running' })
})

// Test DB connection route
app.get('/api/health/db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result')
    res.json({ status: 'connected', testQuery: rows[0].result })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})