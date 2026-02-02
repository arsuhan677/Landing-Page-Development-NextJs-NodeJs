const admin = require("firebase-admin");
const db = require("../config/firebase");
const AfterBeforModel = require("../models/afterbeforModel");

const collectionName = "beforeAfterImages";

const createAfterbefor = async (req, res) => {
  try {
    const { before, after } = req.body;
    if (!before || !after)
      return res.status(400).json({ message: "Before and After images required" });

    const imageObj = new AfterBeforModel({ before, after });

    const docRef = db.collection(collectionName).doc();
    await docRef.set({
      ...imageObj,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ id: docRef.id, ...imageObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAfterbefor = async (req, res) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAfterbeforById = async (req, res) => {
  try {
    const doc = await db.collection(collectionName).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAfterbefor = async (req, res) => {
  try {
    const { before, after } = req.body;

    // Safe update: only update if value exists
    const data = {};
    if (before) data.before = before;
    if (after) data.after = after;
    data.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    const docRef = db.collection(collectionName).doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ message: "Not found" });

    await docRef.update(data);
    const updatedDoc = await docRef.get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAfterbefor = async (req, res) => {
  try {
    const docRef = db.collection(collectionName).doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ message: "Not found" });

    await docRef.delete();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createAfterbefor,
  getAllAfterbefor,
  getAfterbeforById,
  updateAfterbefor,
  deleteAfterbefor,
};
