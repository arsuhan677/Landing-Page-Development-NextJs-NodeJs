const db = require("../../src/config/firebase");
const usageGuidelines = require("../models/usageGuidelines");

// add
const addusageGuidelines = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "title and description are required" });
    }

    const UsageGuidelinesData = {
      title,
      description: description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const docRef = db.collection("usage-guidelines").doc();
    await docRef.set(UsageGuidelinesData);

    res.status(201).json({ success: true, message: "usageGuidelines added successfully", id: docRef.id });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ success: false, message: "Failed to add usageGuidelines", error: error.message });
  }
};

const getusageGuidelines = async (req, res) => {
  try {
    const usageguidelinesRef = db.collection("usage-guidelines");
    const snapshot = await usageguidelinesRef.get();
    const usageguidelines = [];
    snapshot.forEach((doc) => {
      usageguidelines.push({ id: doc.id, ...doc.data() });
    });
    res.json(usageguidelines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch usageguidelines" });
  }
};

const getSingleUsageGuidelines = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "UsageGuidelines ID is required" });
    }

    const docRef = db.collection("usage-guidelines").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ success: false, message: "UsageGuidelines not found" });
    }

    res.json({
      success: true,
      data: { id: doc.id, ...doc.data() },
    });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch usageGuidelines",
      error: error.message,
    });
  }
};


const updateUsageGuidelinest = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.updated_at = new Date();

    await db.collection("usage-guidelines").doc(id).update(data);
    res.json({ success: true, message: "usageguidelines updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update usageguidelines" });
  }
};

// delete
const deleteUsageGuidelines = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("usage-guidelines").doc(id).delete();
    res.json({ success: true, message: "usageguidelines deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete usageguidelines" });
  }
};

module.exports = { addusageGuidelines, getusageGuidelines, getSingleUsageGuidelines, updateUsageGuidelinest, deleteUsageGuidelines };
