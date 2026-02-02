const express = require("express");
const { createPendingOrder, confirmOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createPendingOrder);

router.put("/:id/confirm", confirmOrder);

router.get("/", getAllOrders);

module.exports = router;
