const express = require('express')
const router = express.Router()
const {
  listProducts,
  getProduct,
  getRelated,
  listCategories,
  listBrands,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} = require('../controllers/productController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.get('/', listProducts)
router.get('/categories', listCategories)
router.get('/brands', listBrands)
router.get('/:id/related', getRelated)
router.get('/:id', getProduct)

router.post('/', protect, adminOnly, adminCreateProduct)
router.put('/:id', protect, adminOnly, adminUpdateProduct)
router.delete('/:id', protect, adminOnly, adminDeleteProduct)

router.post('/categories', protect, adminOnly, adminCreateCategory)
router.put('/categories/:id', protect, adminOnly, adminUpdateCategory)
router.delete('/categories/:id', protect, adminOnly, adminDeleteCategory)

module.exports = router