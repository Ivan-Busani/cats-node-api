import pool from '../config/database';
import { Cat, SaveCatInput } from '../types/cat';

export async function findAll(): Promise<Cat[]> {
  const result = await pool.query(
    'SELECT * FROM cats ORDER BY id DESC'
  );
  return result.rows;
}

export async function findById(id: number): Promise<Cat | null> {
  const result = await pool.query(
    'SELECT * FROM cats WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function findByCatId(catId: string): Promise<Cat | null> {
  const result = await pool.query(
    'SELECT * FROM cats WHERE cat_id = $1',
    [catId]
  );
  return result.rows[0] || null;
}

export async function save(cat: SaveCatInput): Promise<Cat> {
  const { cat_id, url, width, height, breeds } = cat;
  const result = await pool.query(
    `INSERT INTO cats (cat_id, url, width, height, breeds, api_used, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, 'nodejs', NOW(), NOW())
     RETURNING *`,
    [cat_id, url, width, height, JSON.stringify(breeds)]
  );
  return result.rows[0];
}

export async function update(id: number, cat: SaveCatInput): Promise<Cat | null> {
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

export async function remove(id: number): Promise<Cat | null> {
  const result = await pool.query(
    'DELETE FROM cats WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0] || null;
}
