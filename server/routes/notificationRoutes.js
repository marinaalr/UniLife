const express = require("express");

// Notification controller functions
const {
    getNotifications,
    markAsRead,
} = require("../controllers/notificationController");

// Authentication middleware
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged in user's notifications
router.get("/", authenticateToken, getNotifications);

// Mark a notification as read
router.put("/:id/read", authenticateToken, markAsRead);

module.exports = router;