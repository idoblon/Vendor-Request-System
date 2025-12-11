const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const { validateCreateProduct, validateUpdateProduct, validateProductId } = require("../validators/productValidator");

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", productController.getAllProducts);

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", validateProductId, productController.getProductById);

// @route   POST api/products
// @desc    Create new product
// @access  Private (center)
router.post("/", auth, validateCreateProduct, productController.createProduct);

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private (center)
router.put("/:id", auth, validateUpdateProduct, productController.updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private (center)
router.delete("/:id", auth, validateProductId, productController.deleteProduct);

module.exports = router;
