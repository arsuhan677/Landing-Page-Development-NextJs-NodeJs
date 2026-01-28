const express = require("express");
const router = express.Router();
const { addHero, getHero, updateHero, deleteHero } = require("../controllers/heroController");

router.post("/", addHero);

router.get("/", getHero);

router.put("/:id", updateHero);

router.delete("/:id", deleteHero);

module.exports = router;
