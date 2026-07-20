const pool = require('../config/db')

async function getProducts({ category, brand, maxPrice, sortBy, search, page, limit }) {
  let query = `
    SELECT p.*, c.slug AS category_slug, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `
  const params = []

  if (category) {
    query += ' AND c.slug = ?'
    params.push(category)
  }
  if (brand) {
    query += ' AND p.brand = ?'
    params.push(brand)
  }
  if (maxPrice) {
    query += ' AND p.price <= ?'
    params.push(maxPrice)
  }
  if (search) {
    query += ' AND p.name LIKE ?'
    params.push(`%${search}%`)
  }

  if (sortBy === 'price-low') query += ' ORDER BY p.price ASC'
  else if (sortBy === 'price-high') query += ' ORDER BY p.price DESC'
  else if (sortBy === 'rating') query += ' ORDER BY p.rating DESC'
  else query += ' ORDER BY p.id ASC'

  const offset = (page - 1) * limit
  query += ' LIMIT ? OFFSET ?'
  params.push(limit, offset)

  const [rows] = await pool.query(query, params)
  return rows
}

async function countProducts({ category, brand, maxPrice, search }) {
  let query = `
    SELECT COUNT(*) AS total
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `
  const params = []

  if (category) {
    query += ' AND c.slug = ?'
    params.push(category)
  }
  if (brand) {
    query += ' AND p.brand = ?'
    params.push(brand)
  }
  if (maxPrice) {
    query += ' AND p.price <= ?'
    params.push(maxPrice)
  }
  if (search) {
    query += ' AND p.name LIKE ?'
    params.push(`%${search}%`)
  }

  const [rows] = await pool.query(query, params)
  return rows[0].total
}

async function getProductById(id) {
  const [rows] = await pool.query(
    `SELECT p.*, c.slug AS category_slug, c.name AS category_name
     FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [id]
  )
  return rows[0]
}

async function getDistinctBrands() {
  const [rows] = await pool.query('SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL')
  return rows.map((r) => r.brand)
}

async function createProduct(data) {
  const { categoryId, name, description, brand, price, originalPrice, stockQuantity, image } = data
  const [result] = await pool.query(
    `INSERT INTO products (category_id, name, description, brand, price, original_price, stock_quantity, image)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [categoryId, name, description, brand, price, originalPrice || null, stockQuantity, image]
  )
  return result.insertId
}

async function updateProduct(id, data) {
  const { categoryId, name, description, brand, price, originalPrice, stockQuantity, image } = data
  await pool.query(
    `UPDATE products SET category_id=?, name=?, description=?, brand=?, price=?, original_price=?, stock_quantity=?, image=?
     WHERE id=?`,
    [categoryId, name, description, brand, price, originalPrice || null, stockQuantity, image, id]
  )
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = ?', [id])
}

async function getRelatedProducts(productId, categoryId, limit = 4) {
  const [rows] = await pool.query(
    `SELECT p.*, c.slug AS category_slug, c.name AS category_name
     FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE p.category_id = ? AND p.id != ?
     ORDER BY RAND()
     LIMIT ?`,
    [categoryId, productId, limit]
  )
  return rows
}

module.exports = {
  getProducts,
  countProducts,
  getProductById,
  getDistinctBrands,
  createProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
}