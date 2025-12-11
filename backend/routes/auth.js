const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const { validateRegistration, validateLogin } = require("../validators/authValidator");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", validateRegistration, authController.register);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", validateLogin, authController.login);

// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get("/user", auth, authController.getUser);

module.exports = router;
