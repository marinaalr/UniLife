const express = require("express");

const {
    getEvents,
    saveEvents
} = require("../controllers/eventController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getEvents
);

router.put(
    "/",
    authenticateToken,
    saveEvents
);

module.exports = router;