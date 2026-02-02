const express = require("express");
const { addusageGuidelines, getusageGuidelines, updateUsageGuidelinest, deleteUsageGuidelines } = require("../controllers/usageGuidelinesController");
const router = express.Router();

router.post("/", addusageGuidelines);

router.get("/", getusageGuidelines);

router.put("/:id", updateUsageGuidelinest);

router.delete("/:id", deleteUsageGuidelines);

module.exports = router;
