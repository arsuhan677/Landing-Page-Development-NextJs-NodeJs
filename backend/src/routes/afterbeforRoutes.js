const express = require("express");
const {
  createAfterbefor,
  getAllAfterbefor,
  getAfterbeforById,
  updateAfterbefor,
  deleteAfterbefor,
} = require("../controllers/afterbeforController");

const router = express.Router();

router.post("/", createAfterbefor);
router.get("/", getAllAfterbefor);
router.get("/:id", getAfterbeforById);
router.put("/:id", updateAfterbefor);
router.delete("/:id", deleteAfterbefor);

module.exports = router;
