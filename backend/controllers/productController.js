const productService = require("../services/productService.js");

const createProduct = async (req, res) => {
  try {
    const { name, sku, price } = req.body;

    if (!name || !sku || price === undefined) {
      return res.status(400).json({
        message: "Name, SKU and price are required",
      });
    }

    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "SKU already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "SKU already exists",
      });
    }

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};