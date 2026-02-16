const express = require("express");
const { createPendingOrder, confirmOrder, getAllOrders, getOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createPendingOrder);

router.put("/:id/confirm", confirmOrder);

router.get("/", getAllOrders);
router.get("/:id", getOrder);

module.exports = router;
