const express = require("express");
const { addIngredient, getIngredients, updateIngredient, deleteIngredient } = require("../controllers/IngredientsController");
const router = express.Router();

router.post("/", addIngredient);

router.get("/", getIngredients);

router.put("/:id", updateIngredient);

router.delete("/:id", deleteIngredient);

module.exports = router;
