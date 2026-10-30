const express = require("express");

const {
    getEvents,
    saveEvents
} = require("../controllers/eventController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get User Events
router.get(
    "/",
    authenticateToken,
    getEvents
);

// Save User Events
router.put(
    "/",
    authenticateToken,
    saveEvents
);

module.exports = router;