const { getAddressesByUser, createAddress } = require('../models/addressModel')

async function listAddresses(req, res) {
  try {
    const addresses = await getAddressesByUser(req.user.id)
    res.status(200).json({ addresses })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching addresses' })
  }
}

async function addAddress(req, res) {
  try {
    const { fullName, phone, addressLine, city, state, postalCode, isDefault } = req.body

    if (!fullName || !phone || !addressLine || !city || !state || !postalCode) {
      return res.status(400).json({ message: 'All address fields are required' })
    }

    const addressId = await createAddress(req.user.id, {
      fullName, phone, addressLine, city, state, postalCode, isDefault,
    })

    const addresses = await getAddressesByUser(req.user.id)
    res.status(201).json({ message: 'Address added', addressId, addresses })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error adding address' })
  }
}

module.exports = { listAddresses, addAddress }