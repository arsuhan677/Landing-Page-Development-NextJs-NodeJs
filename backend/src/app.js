const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// const adminRoutes = require("./routes/adminRoutes");
const heroRoutes = require("./routes/heroRoutes")

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoute");

require("./config/firebase");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/admin", adminRoutes);
app.use("/api/hero", heroRoutes);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true
}));

app.get("/", (req, res) => res.send("Backend running"));

module.exports = app;
