const pool = require('../config/db')

async function getAllCategories() {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC')
  return rows
}

async function createCategory(name, slug, icon) {
  const [result] = await pool.query(
    'INSERT INTO categories (name, slug, icon) VALUES (?, ?, ?)',
    [name, slug, icon]
  )
  return result.insertId
}

async function updateCategory(id, name, slug, icon) {
  await pool.query('UPDATE categories SET name=?, slug=?, icon=? WHERE id=?', [name, slug, icon, id])
}

async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE id = ?', [id])
}

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory }