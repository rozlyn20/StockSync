const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      warehouseId,
      orderNumber,
      status,
      totalAmount,
    } = req.body;

    if (!userId || !warehouseId || !orderNumber) {
      return res.status(400).json({
        message: "userId, warehouseId and orderNumber are required",
      });
    }

    const order = await orderService.createOrder(
      userId,
      warehouseId,
      orderNumber,
      status,
      totalAmount
    );

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Order number already exists",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Invalid user or warehouse",
      });
    }

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { status, totalAmount } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const order = await orderService.updateOrder(
      req.params.id,
      status,
      totalAmount
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update order",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete order",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};