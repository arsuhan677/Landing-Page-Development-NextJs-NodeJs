const db = require("../config/firebase");
const Order = require("../models/order");

// Customer creates order
const createOrder = async (req, res) => {
  try {
    const { customer, products } = req.body;

    if (!customer || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Customer info and products are required" });
    }

    // Create order
    const order = new Order({ customer, products });

    // Save in Firestore
    await db.collection("orders").doc(order.orderId).set(order.toPlainObject());

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: order.orderId,
      totalAmount: order.totalAmount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
};

// Admin: get all orders
const getAllOrders = async (req, res) => {
  try {
    const snapshot = await db.collection("orders").orderBy("created_at", "desc").get();
    const orders = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
};

// Admin: update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Confirmed", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await orderRef.update({
      status,
      updated_at: new Date(),
    });

    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update order", error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
