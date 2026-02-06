const express = require("express");
const { addusageGuidelines, getusageGuidelines, updateUsageGuidelinest, deleteUsageGuidelines, getSingleUsageGuidelines } = require("../controllers/usageGuidelinesController");
const router = express.Router();

router.post("/", addusageGuidelines);

router.get("/", getusageGuidelines);

router.get("/:id", getSingleUsageGuidelines);

router.put("/:id", updateUsageGuidelinest);

router.delete("/:id", deleteUsageGuidelines);

module.exports = router;
