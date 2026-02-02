const db = require("../../src/config/firebase");
const Review = require("../models/review");

// add
const addRewiew = async (req, res) => {
  try {
    const { name, title, description, rating} = req.body;

    if (!name || !title || !description || !rating) {
      return res.status(400).json({ success: false, message: "Name title rating are required" });
    }

    const reviewData = {
      name,
      title,
      description: description,
      rating,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("review").doc();
    await docRef.set(reviewData);

    res.status(201).json({ success: true, message: "Review added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add review", error: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const reviewsRef = db.collection("review");
    const snapshot = await reviewsRef.get();
    const reviews = [];
    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("review").doc(id).update(data);
    res.json({ success: true, message: "review updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update review" });
  }
};

// delete
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("review").doc(id).delete();
    res.json({ success: true, message: "review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete review" });
  }
};

module.exports = { addRewiew, getReview, updateReview, deleteReview };
