require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();
const productRoutes = require("./routes/productRoute.js");
const inventoryRoutes = require("./routes/inventoryRoute.js");
const warehouseRoutes = require("./routes/warehouseRoute.js");
const orderRoutes = require("./routes/orderRoute.js");
const userRoutes = require("./routes/userRoute.js");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "StockSync API is running" });
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "PostgreSQL connected!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});