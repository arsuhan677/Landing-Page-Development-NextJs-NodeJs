const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");
const heroRoutes = require("./routes/heroRoutes")
const productRoutes = require("./routes/productRoutes");
const reviewRoute = require("./routes/reviewRoute");
const ingredientRoute = require("./routes/ingredientRoute");
const usageGuidelinesRoutes = require("./routes/usageGuidelinesRoutes");
const afterbeforRoutes = require("./routes/afterbeforRoutes");
const productgallryRoutes = require("./routes/productgallryRoutes")
const orderRoutes = require("./routes/orderRoutes");


require("./config/firebase");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/products", productRoutes);
app.use("/api/review", reviewRoute);
app.use("/api/ingredient", ingredientRoute);
app.use("/api/usageguideline", usageGuidelinesRoutes);
app.use("/api/productgallry", productgallryRoutes);
app.use("/api/afterbefor", afterbeforRoutes);
app.use("/api/orders", orderRoutes);

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true
}));

app.get("/", (req, res) => res.send("Backend running this is suhan"));

module.exports = app;



// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const heroRoutes = require("./routes/heroRoutes");
// const productRoutes = require("./routes/productRoutes");
// // const orderRoutes = require("./routes/orderRoutes");

// require("./config/firebase");

// const app = express();

// // CORS setup
// app.use(cors({
//   origin: "http://localhost:5000",
//   credentials: true
// }));

// // Body parser
// app.use(express.json());

// // Routes
// app.use("/api/hero", heroRoutes);
// app.use("/api/products", productRoutes);
// // app.use("/api/orders", orderRoutes);

// // Root route
// app.get("/", (req, res) => res.send("Backend running"));

// module.exports = app;
