const db = require("../config/firebase");
const ProductGallry = require("../models/productGalleryModel");

// add
const addProductGallry = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "image are required" });
    }

    const productgallryData = {
      image,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("productgallry").doc();
    await docRef.set(productgallryData);

    res.status(201).json({ success: true, message: "ProductGallry added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add ProductGallry", error: error.message });
  }
};

const getProductGallry = async (req, res) => {
  try {
    const productgallryRef = db.collection("productgallry");
    const snapshot = await productgallryRef.get();
    const productgallry = [];
    snapshot.forEach((doc) => {
      productgallry.push({ id: doc.id, ...doc.data() });
    });
    res.json(productgallry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch productgallry" });
  }
};

const updateProductGallry = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("productgallry").doc(id).update(data);
    res.json({ success: true, message: "Productgallry updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update productgallry" });
  }
};

// delete
const deleteProductGallry = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("productgallry").doc(id).delete();
    res.json({ success: true, message: "Productgallry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete productgallry" });
  }
};

module.exports = { addProductGallry, getProductGallry, updateProductGallry, deleteProductGallry };
