const { getStats, getTopProducts, getLowStockProducts } = require('../models/dashboardModel')
const { getAllUsers } = require('../models/userModel')

async function getDashboardData(req, res) {
  try {
    const [stats, topProducts, lowStock] = await Promise.all([
      getStats(),
      getTopProducts(),
      getLowStockProducts(),
    ])
    res.status(200).json({ stats, topProducts, lowStock })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching dashboard data' })
  }
}

async function listUsers(req, res) {
  try {
    const users = await getAllUsers()
    res.status(200).json({ users })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching users' })
  }
}

module.exports = { getDashboardData, listUsers }