const { getWishlist, addToWishlist, removeFromWishlist } = require('../models/wishlistModel')
const { getProductById } = require('../models/productModel')

async function getMyWishlist(req, res) {
  try {
    const items = await getWishlist(req.user.id)
    res.status(200).json({ items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching wishlist' })
  }
}

async function addItem(req, res) {
  try {
    const { productId } = req.body

    const product = await getProductById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    await addToWishlist(req.user.id, productId)
    const items = await getWishlist(req.user.id)
    res.status(200).json({ message: 'Added to wishlist', items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error adding to wishlist' })
  }
}

async function removeItem(req, res) {
  try {
    const { productId } = req.params
    await removeFromWishlist(req.user.id, productId)
    const items = await getWishlist(req.user.id)
    res.status(200).json({ message: 'Removed from wishlist', items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error removing from wishlist' })
  }
}

module.exports = { getMyWishlist, addItem, removeItem }