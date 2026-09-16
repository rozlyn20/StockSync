const warehouseService = require("../services/warehouseService");

const createWarehouse = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Warehouse name is required" });
    }

    const warehouse = await warehouseService.createWarehouse(name, location);

    res.status(201).json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create warehouse" });
  }
};

const getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await warehouseService.getAllWarehouses();

    res.status(200).json(warehouses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch warehouses" });
  }
};

const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await warehouseService.getWarehouseById(req.params.id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch warehouse" });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Warehouse name is required" });
    }

    const warehouse = await warehouseService.updateWarehouse(
      req.params.id,
      name,
      location
    );

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update warehouse" });
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await warehouseService.deleteWarehouse(req.params.id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.status(200).json({
      message: "Warehouse deleted successfully",
      warehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete warehouse" });
  }
};

module.exports = {
  createWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
  deleteWarehouse,
};