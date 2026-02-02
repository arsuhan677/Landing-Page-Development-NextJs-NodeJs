// const Order = require("../models/orderModel");

// // ফর্ম ফিল করলে auto unconfirmed save হবে
// exports.createUnconfirmedOrder = async (req, res) => {
//   try {
//     const orderData = req.body;
//     const id = await Order.saveUnconfirmed(orderData);
//     res.status(200).json({ message: "Unconfirmed order saved", id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Confirm button চাপলে
// exports.confirmOrder = async (req, res) => {
//   try {
//     const { orderId, paymentDetails } = req.body;
//     await Order.moveToConfirmed(orderId, { paymentDetails });
//     res.status(200).json({ message: "Order confirmed successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
