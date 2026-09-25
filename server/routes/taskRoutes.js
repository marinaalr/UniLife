const express = require("express");

const {
    getTasks,
    saveTasks
} = require("../controllers/taskController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get the logged in user's tasks
router.get(
    "/",
    authenticateToken,
    getTasks
);

// Save the logged in user's tasks
router.put(
    "/",
    authenticateToken,
    saveTasks
);

module.exports = router;