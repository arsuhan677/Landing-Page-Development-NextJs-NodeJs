const db = require("../../src/config/firebase");
const Hero = require("../models/heroModel");

// add
const addHero = async (req, res) => {
  try {
    const { title, subtitle, rating, price, discount, image, description } = req.body;

    if (!title || !subtitle || !discount || !description || !price || !image) {
      return res.status(400).json({ success: false, message: "Name, price, and image are required" });
    }

    const heroData = {
      title,
      subtitle,
      rating,
      discount: discount || 0,
      image,
      description,
      price: price,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("hero").doc();
    await docRef.set(heroData);

    res.status(201).json({ success: true, message: "Hero added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add heroProduct", error: error.message });
  }
};

const getHero = async (req, res) => {
  try {
    const heroRef = db.collection("hero");
    const snapshot = await heroRef.get();
    const hero = [];
    snapshot.forEach((doc) => {
      hero.push({ id: doc.id, ...doc.data() });
    });
    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch Heroproducts" });
  }
};

const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("hero").doc(id).update(data);
    res.json({ success: true, message: "Hero updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update Hero" });
  }
};

// delete
const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("hero").doc(id).delete();
    res.json({ success: true, message: "Hero deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete heroproduct" });
  }
};

module.exports = { addHero, getHero, updateHero, deleteHero };
