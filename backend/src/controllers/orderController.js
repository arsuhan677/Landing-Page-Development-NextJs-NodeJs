const admin = require("firebase-admin");
const db = require("../config/firebase");
const Order = require("../models/orderModel");

const collectionName = "orders";

const createPendingOrder = async (req, res) => {
  try {
    const { name, mobile, address, district, note, quantity, total } = req.body;

    if (!name || !mobile || !address || !district) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const orderObj = new Order({ name, mobile, address, district, note, quantity, total, status: "pending" });

    const docRef = db.collection(collectionName).doc();
    await docRef.set({
      ...orderObj,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id, ...orderObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const docRef = db.collection(collectionName).doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) return res.status(404).json({ message: "Order not found" });

    await docRef.update({
      status: "confirmed",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await docRef.get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPendingOrder,
  confirmOrder,
  getAllOrders,
};
