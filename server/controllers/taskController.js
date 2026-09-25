const {
    getListsByUserId,
    saveListsForUser
} = require("../models/Task");

// Get the logged in user's task lists
const getTasks = (req, res) => {
    try {
        const lists = getListsByUserId(req.user.id);

        res.json({
            lists: lists
        });
    } catch {
        res.status(500).json({
            message: "Server error."
        });
    }
};

// Save the logged in user's task lists
const saveTasks = (req, res) => {
    try {
        const { lists } = req.body;

        if (!Array.isArray(lists)) {
            return res.status(400).json({
                message: "Invalid task data."
            });
        }

        const savedLists = saveListsForUser(
            req.user.id,
            lists
        );

        res.json({
            message: "Tasks saved successfully.",
            lists: savedLists
        });
    } catch {
        res.status(500).json({
            message: "Server error."
        });
    }
};

module.exports = {
    getTasks,
    saveTasks
};