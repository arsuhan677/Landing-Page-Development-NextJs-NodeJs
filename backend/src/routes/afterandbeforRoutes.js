const express = require("express");
const { addAfterandBefor, getAfterandBefor, updateAfterandbefor, deleteAfterandbefor } = require("../controllers/afterandbeforController");
const router = express.Router();


router.post("/", addAfterandBefor);

router.get("/", getAfterandBefor);

router.put("/:id", updateAfterandbefor);

router.delete("/:id", deleteAfterandbefor);

module.exports = router;
