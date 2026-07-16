const express = require('express')
const router = express.Router()
const { listProducts, getProduct, listCategories, listBrands } = require('../controllers/productController')

router.get('/', listProducts)
router.get('/categories', listCategories)
router.get('/brands', listBrands)
router.get('/:id', getProduct)

module.exports = router