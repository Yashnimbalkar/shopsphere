const express = require('express')
const router = express.Router()
const {
  listProducts, getProduct, listCategories, listBrands,
  adminCreateProduct, adminUpdateProduct, adminDeleteProduct,
} = require('../controllers/productController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

const { adminCreateCategory, adminUpdateCategory, adminDeleteCategory } = require('../controllers/productController')
router.post('/categories', protect, adminOnly, adminCreateCategory)
router.put('/categories/:id', protect, adminOnly, adminUpdateCategory)
router.delete('/categories/:id', protect, adminOnly, adminDeleteCategory)

router.get('/', listProducts)
router.get('/categories', listCategories)
router.get('/brands', listBrands)
router.get('/:id', getProduct)

router.post('/', protect, adminOnly, adminCreateProduct)
router.put('/:id', protect, adminOnly, adminUpdateProduct)
router.delete('/:id', protect, adminOnly, adminDeleteProduct)

module.exports = router