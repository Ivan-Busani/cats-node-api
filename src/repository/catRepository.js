const pool = require('../config/database');

async function findAll() {
  const result = await pool.query(
    'SELECT * FROM cats ORDER BY id DESC'
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    'SELECT * FROM cats WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

async function findByCatId(catId) {
  const result = await pool.query(
    'SELECT * FROM cats WHERE cat_id = $1',
    [catId]
  );
  return result.rows[0] || null;
}

async function save(cat) {
  const { cat_id, url, width, height, breeds } = cat;
  const result = await pool.query(
    `INSERT INTO cats (cat_id, url, width, height, breeds, api_used, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, 'nodejs', NOW(), NOW())
     RETURNING *`,
    [cat_id, url, width, height, JSON.stringify(breeds)]
  );
  return result.rows[0];
}

async function update(id, cat) {
  const { cat_id, url, width, height, breeds } = cat;
  const result = await pool.query(
    `UPDATE cats
     SET cat_id = $1, url = $2, width = $3, height = $4, breeds = $5, updated_at = NOW()
     WHERE id = $6
     RETURNING *`,
    [cat_id, url, width, height, JSON.stringify(breeds), id]
  );
  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(
    'DELETE FROM cats WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0] || null;
}

module.exports = { findAll, findById, findByCatId, save, update, remove };
