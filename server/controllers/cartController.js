const {
  getOrCreateCart,
  getCartItems,
  addOrUpdateItem,
  setItemQuantity,
  removeItem,
  clearCartItems,
} = require('../models/cartModel')
const { getProductById } = require('../models/productModel')

async function getCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user.id)
    const items = await getCartItems(cart.id)
    res.status(200).json({ items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching cart' })
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body

    const product = await getProductById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' })
    }

    const cart = await getOrCreateCart(req.user.id)
    await addOrUpdateItem(cart.id, productId, quantity)

    const items = await getCartItems(cart.id)
    res.status(200).json({ message: 'Added to cart', items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error adding to cart' })
  }
}

async function updateCartItem(req, res) {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' })
    }

    const product = await getProductById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' })
    }

    const cart = await getOrCreateCart(req.user.id)
    await setItemQuantity(cart.id, productId, quantity)

    const items = await getCartItems(cart.id)
    res.status(200).json({ message: 'Cart updated', items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error updating cart' })
  }
}

async function removeFromCart(req, res) {
  try {
    const { productId } = req.params
    const cart = await getOrCreateCart(req.user.id)
    await removeItem(cart.id, productId)

    const items = await getCartItems(cart.id)
    res.status(200).json({ message: 'Item removed', items })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error removing item' })
  }
}

async function clearCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user.id)
    await clearCartItems(cart.id)
    res.status(200).json({ message: 'Cart cleared', items: [] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error clearing cart' })
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart }