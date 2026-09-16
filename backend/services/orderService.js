const pool = require("../config/db");

const createOrder = async (
  userId,
  warehouseId,
  orderNumber,
  status,
  totalAmount
) => {
  const result = await pool.query(
    `INSERT INTO orders
      (user_id, warehouse_id, order_number, status, total_amount)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, warehouseId, orderNumber, status || "PENDING", totalAmount || 0]
  );

  return result.rows[0];
};

const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT * FROM orders ORDER BY id`
  );

  return result.rows;
};

const getOrderById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM orders WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

const updateOrder = async (id, status, totalAmount) => {
  const result = await pool.query(
    `UPDATE orders
     SET status = $1,
         total_amount = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
    [status, totalAmount, id]
  );

  return result.rows[0];
};

const deleteOrder = async (id) => {
  const result = await pool.query(
    `DELETE FROM orders
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};