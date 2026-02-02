const express = require("express");
const { addUfterandBefor, getUfterandBefor, updateUfterandbefor, deleteUfterandbefor } = require("../controllers/ufterandbeforController");
const router = express.Router();


router.post("/", addUfterandBefor);

router.get("/", getUfterandBefor);

router.put("/:id", updateUfterandbefor);

router.delete("/:id", deleteUfterandbefor);

module.exports = router;
