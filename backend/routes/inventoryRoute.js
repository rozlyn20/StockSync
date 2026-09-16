const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");

// Create inventory
router.post("/", inventoryController.createInventory);

// Get all inventory
router.get("/", inventoryController.getAllInventory);

// Get inventory by ID
router.get("/:id", inventoryController.getInventoryById);

// Update inventory
router.put("/:id", inventoryController.updateInventory);

// Delete inventory
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;