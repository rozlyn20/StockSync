const pool = require("../config/db");

const createInventory = async ({
  product_id,
  warehouse_id,
  quantity,
  reserved_quantity,
  reorder_level,
}) => {
  const result = await pool.query(
    `INSERT INTO inventory
      (product_id, warehouse_id, quantity, reserved_quantity, reorder_level)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      product_id,
      warehouse_id,
      quantity ?? 0,
      reserved_quantity ?? 0,
      reorder_level ?? 0,
    ]
  );

  return result.rows[0];
};

const getAllInventory = async () => {
  const result = await pool.query(
    `SELECT * FROM inventory ORDER BY id DESC`
  );

  return result.rows;
};

const getInventoryById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM inventory WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const updateInventory = async (
  id,
  { product_id, warehouse_id, quantity, reserved_quantity, reorder_level }
) => {
  const result = await pool.query(
    `UPDATE inventory
     SET product_id = $1,
         warehouse_id = $2,
         quantity = $3,
         reserved_quantity = $4,
         reorder_level = $5,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [
      product_id,
      warehouse_id,
      quantity,
      reserved_quantity,
      reorder_level,
      id,
    ]
  );

  return result.rows[0];
};

const deleteInventory = async (id) => {
  const result = await pool.query(
    `DELETE FROM inventory
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
};