const pool = require("../config/db");

const createWarehouse = async (name, location) => {
  const result = await pool.query(
    `INSERT INTO warehouses (name, location)
     VALUES ($1, $2)
     RETURNING *`,
    [name, location]
  );

  return result.rows[0];
};

const getAllWarehouses = async () => {
  const result = await pool.query(
    `SELECT * FROM warehouses ORDER BY id`
  );

  return result.rows;
};

const getWarehouseById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM warehouses WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const updateWarehouse = async (id, name, location) => {
  const result = await pool.query(
    `UPDATE warehouses
     SET name = $1, location = $2
     WHERE id = $3
     RETURNING *`,
    [name, location, id]
  );

  return result.rows[0];
};

const deleteWarehouse = async (id) => {
  const result = await pool.query(
    `DELETE FROM warehouses
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
};