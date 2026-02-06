const express = require("express");
const { addProductGallry, getProductGallry, updateProductGallry, deleteProductGallry, getSingleProductGallry } = require("../controllers/productGalleryController");
const router = express.Router();


router.post("/", addProductGallry);

router.get("/", getProductGallry);

router.get("/:id", getSingleProductGallry);

router.put("/:id", updateProductGallry);

router.delete("/:id", deleteProductGallry);

module.exports = router;
