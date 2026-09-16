const inventoryService = require("../services/inventoryService");

const createInventory = async (req, res) => {
  try {
    const {
      product_id,
      warehouse_id,
      quantity,
      reserved_quantity,
      reorder_level,
    } = req.body;

    if (!product_id || !warehouse_id) {
      return res.status(400).json({
        message: "Product ID and Warehouse ID are required",
      });
    }

    if (quantity < 0 || reserved_quantity < 0 || reorder_level < 0) {
      return res.status(400).json({
        message: "Inventory values cannot be negative",
      });
    }

    if ((reserved_quantity ?? 0) > (quantity ?? 0)) {
      return res.status(400).json({
        message: "Reserved quantity cannot exceed quantity",
      });
    }

    const inventory = await inventoryService.createInventory(req.body);

    res.status(201).json(inventory);
  } catch (error) {
    console.error(error);

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Product or warehouse does not exist",
      });
    }

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Inventory already exists for this product and warehouse",
      });
    }

    res.status(500).json({
      message: "Failed to create inventory",
    });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getAllInventory();
    res.json(inventory);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch inventory",
    });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const inventory = await inventoryService.getInventoryById(req.params.id);

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.json(inventory);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch inventory",
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const {
      quantity,
      reserved_quantity,
      reorder_level,
    } = req.body;

    if (quantity < 0 || reserved_quantity < 0 || reorder_level < 0) {
      return res.status(400).json({
        message: "Inventory values cannot be negative",
      });
    }

    if ((reserved_quantity ?? 0) > (quantity ?? 0)) {
      return res.status(400).json({
        message: "Reserved quantity cannot exceed quantity",
      });
    }

    const inventory = await inventoryService.updateInventory(
      req.params.id,
      req.body
    );

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.json(inventory);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update inventory",
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.deleteInventory(req.params.id);

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.json({
      message: "Inventory deleted successfully",
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete inventory",
    });
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
};