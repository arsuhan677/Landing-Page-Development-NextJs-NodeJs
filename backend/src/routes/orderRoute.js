const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");

router.post("/create", createOrder);

router.get("/all", adminAuth, getAllOrders);

router.put("/update/:orderId", adminAuth, updateOrderStatus);

module.exports = router;
