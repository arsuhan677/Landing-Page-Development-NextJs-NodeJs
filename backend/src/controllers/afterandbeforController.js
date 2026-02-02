const db = require("../config/firebase");
const AfterandBefor = require("../models/afterandbeforModel");

// add
const addAfterandBefor = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "image are required" });
    }

    const afterandbeforData = {
      image,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("ufterandbefor").doc();
    await docRef.set(afterandbeforData);

    res.status(201).json({ success: true, message: "afterandbeforProduct added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add afterandbeforProduct", error: error.message });
  }
};

const getAfterandBefor = async (req, res) => {
  try {
    const afterandbeforRef = db.collection("ufterandbefor");
    const snapshot = await afterandbeforRef.get();
    const afterandbefor = [];
    snapshot.forEach((doc) => {
      afterandbefor.push({ id: doc.id, ...doc.data() });
    });
    res.json(afterandbefor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch afterandbefor" });
  }
};

const updateAfterandbefor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("ufterandbefor").doc(id).update(data);
    res.json({ success: true, message: "Afterandbefor updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update afterandbeforProduct" });
  }
};

// delete
const deleteAfterandbefor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("ufterandbefor").doc(id).delete();
    res.json({ success: true, message: "AfterandbeforProduct deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete afterandbefor" });
  }
};

module.exports = { addAfterandBefor, getAfterandBefor, updateAfterandbefor, deleteAfterandbefor };
