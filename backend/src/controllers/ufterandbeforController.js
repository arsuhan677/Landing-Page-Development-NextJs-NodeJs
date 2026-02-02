const db = require("../../src/config/firebase");
const UfterandBefor = require("../models/ufterandbeforModel");

// add
const addUfterandBefor = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "image are required" });
    }

    const ufterandbeforData = {
      image,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("ufterandbefor").doc();
    await docRef.set(ufterandbeforData);

    res.status(201).json({ success: true, message: "ufterandbeforProduct added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add ufterandbeforProduct", error: error.message });
  }
};

const getUfterandBefor = async (req, res) => {
  try {
    const ufterandbeforRef = db.collection("ufterandbefor");
    const snapshot = await ufterandbeforRef.get();
    const ufterandbefor = [];
    snapshot.forEach((doc) => {
      ufterandbefor.push({ id: doc.id, ...doc.data() });
    });
    res.json(ufterandbefor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch ufterandbefor" });
  }
};

const updateUfterandbefor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("ufterandbefor").doc(id).update(data);
    res.json({ success: true, message: "Ufterandbefor updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update ufterandbeforProduct" });
  }
};

// delete
const deleteUfterandbefor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("ufterandbefor").doc(id).delete();
    res.json({ success: true, message: "UfterandbeforProduct deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete ufterandbefor" });
  }
};

module.exports = { addUfterandBefor, getUfterandBefor, updateUfterandbefor, deleteUfterandbefor };
