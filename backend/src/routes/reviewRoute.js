const express = require("express");
const router = express.Router();
const { addRewiew, getReview, updateReview, deleteReview, getSingleReview } = require("../controllers/reviewController");

router.post("/", addRewiew);

router.get("/", getReview);

router.get("/:id", getSingleReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;
