const express = require("express");
const { addProductGallry, getProductGallry, updateProductGallry, deleteProductGallry } = require("../controllers/productGalleryController");
const router = express.Router();


router.post("/", addProductGallry);

router.get("/", getProductGallry);

router.put("/:id", updateProductGallry);

router.delete("/:id", deleteProductGallry);

module.exports = router;
