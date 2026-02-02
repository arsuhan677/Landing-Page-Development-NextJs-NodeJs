const db = require("../../src/config/firebase");
const Ingredients = require("../models/Ingredients");

// add
const addIngredient = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "title and description are required" });
    }

    const IngredientData = {
      title,
      description: description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("ingredients").doc();
    await docRef.set(IngredientData);

    res.status(201).json({ success: true, message: "Ingredients added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add ingredients", error: error.message });
  }
};

const getIngredients = async (req, res) => {
  try {
    const ingredientsRef = db.collection("ingredients");
    const snapshot = await ingredientsRef.get();
    const ingredients = [];
    snapshot.forEach((doc) => {
      ingredients.push({ id: doc.id, ...doc.data() });
    });
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch Ingredients" });
  }
};

const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("ingredients").doc(id).update(data);
    res.json({ success: true, message: "Ingredients updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update Ingredient" });
  }
};

// delete
const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("ingredients").doc(id).delete();
    res.json({ success: true, message: "Ingredients deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete Ingredients" });
  }
};

module.exports = { addIngredient, getIngredients, updateIngredient, deleteIngredient };
