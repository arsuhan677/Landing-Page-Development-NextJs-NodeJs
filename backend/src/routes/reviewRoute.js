const express = require("express");
const router = express.Router();
const { addRewiew, getReview, updateReview, deleteReview } = require("../controllers/reviewController");

router.post("/", addRewiew);

router.get("/", getReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;
