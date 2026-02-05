const db = require("../../src/config/firebase");
const Product = require("../models/productModel");

// add
const addProduct = async (req, res) => {
  try {
    const { name, price, discount, image, stock, description, is_active } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ success: false, message: "Name, price, and image are required" });
    }

    const productData = {
      name,
      price,
      discount: discount || 0,
      image,
      stock: stock ?? true,
      description,
      is_active: is_active ?? true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("products").doc();
    await docRef.set(productData);

    res.status(201).json({ success: true, message: "Product added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add product", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.get();
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const docRef = db.collection("products").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: docSnap.id,
        ...docSnap.data(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("products").doc(id).update(data);
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

// delete
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("products").doc(id).delete();
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};

module.exports = { addProduct, getProducts, getSingleProduct, updateProduct, deleteProduct };
