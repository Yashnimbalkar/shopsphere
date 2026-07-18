const {
  getProducts,
  countProducts,
  getProductById,
  getDistinctBrands,
} = require('../models/productModel')
const { getAllCategories } = require('../models/categoryModel')

async function listProducts(req, res) {
  try {
    const {
      category,
      brand,
      maxPrice,
      sortBy = 'relevance',
      search,
      page = 1,
      limit = 12,
    } = req.query

    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.max(1, parseInt(limit))

    const filters = { category, brand, maxPrice, sortBy, search, page: pageNum, limit: limitNum }

    const [products, total] = await Promise.all([
      getProducts(filters),
      countProducts({ category, brand, maxPrice, search }),
    ])

    res.status(200).json({
      products,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching products' })
  }
}

async function getProduct(req, res) {
  try {
    const product = await getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ product })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching product' })
  }
}

async function listCategories(req, res) {
  try {
    const categories = await getAllCategories()
    res.status(200).json({ categories })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching categories' })
  }
}

async function listBrands(req, res) {
  try {
    const brands = await getDistinctBrands()
    res.status(200).json({ brands })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching brands' })
  }
}

const { createProduct, updateProduct, deleteProduct } = require('../models/productModel') // add to existing import

async function adminCreateProduct(req, res) {
  try {
    const id = await createProduct(req.body)
    res.status(201).json({ message: 'Product created', id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error creating product' })
  }
}

async function adminUpdateProduct(req, res) {
  try {
    await updateProduct(req.params.id, req.body)
    res.status(200).json({ message: 'Product updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error updating product' })
  }
}

async function adminDeleteProduct(req, res) {
  try {
    await deleteProduct(req.params.id)
    res.status(200).json({ message: 'Product deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error deleting product' })
  }
}

module.exports = { listProducts, getProduct, listCategories, listBrands }