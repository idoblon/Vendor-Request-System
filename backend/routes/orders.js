const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const { validateCreateOrder, validateUpdatePayment, validateOrderId } = require("../validators/orderValidator");

// @route   GET api/orders/vendor-rankings
// @desc    Get all vendor rankings (for admin)
// @access  Private
router.get("/vendor-rankings", auth, orderController.getVendorRankings);

// @route   GET api/orders/my-ranking
// @desc    Get current vendor's ranking position
// @access  Private (vendor)
router.get("/my-ranking", auth, orderController.getMyRanking);

// @route   GET api/orders
// @desc    Get all orders for a vendor
// @access  Private (vendor)
router.get("/", auth, orderController.getVendorOrders);

// @route   GET api/orders/stats
// @desc    Get order statistics for vendor
// @access  Private (vendor)
router.get("/stats", auth, orderController.getOrderStats);

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private (vendor)
router.get("/:id", auth, validateOrderId, orderController.getOrderById);

// @route   POST api/orders
// @desc    Create a new order
// @access  Private (vendor)
router.post("/", auth, validateCreateOrder, orderController.createOrder);

// @route   PUT api/orders/:id/payment
// @desc    Update order payment status
// @access  Private (vendor)
router.put("/:id/payment", auth, validateUpdatePayment, orderController.updatePaymentStatus);

module.exports = router;
