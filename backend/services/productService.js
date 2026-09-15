const pool = require("../config/db.js");

const createProduct = async ({
  name,
  description,
  sku,
  category_id,
  price,
}) => {
  const result = await pool.query(
    `INSERT INTO products
      (name, description, sku, category_id, price)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description ?? null, sku, category_id ?? null, price]
  );

  return result.rows[0];
};

const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT * FROM products ORDER BY id DESC`
  );

  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const updateProduct = async (
  id,
  { name, description, sku, category_id, price }
) => {
  const result = await pool.query(
    `UPDATE products
     SET name = $1,
         description = $2,
         sku = $3,
         category_id = $4,
         price = $5
     WHERE id = $6
     RETURNING *`,
    [name, description ?? null, sku, category_id ?? null, price, id]
  );

  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    `DELETE FROM products
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};