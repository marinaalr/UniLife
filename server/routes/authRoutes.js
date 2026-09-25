const express = require("express");

const {
    register,
    login,
    updateProfile
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", register);

//log in an existing user
router.post("/login", login);

// Update the logged in user's profile
router.put(
    "/profile",
    authenticateToken,
    updateProfile
);

module.exports = router;