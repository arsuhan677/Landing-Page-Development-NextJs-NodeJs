const express = require("express");
const router = express.Router();
const { addHero, getHero, updateHero, deleteHero, getSingleHero } = require("../controllers/heroController");

router.post("/", addHero);

router.get("/", getHero);

router.get("/:id", getSingleHero);

router.put("/:id", updateHero);

router.delete("/:id", deleteHero);

module.exports = router;
