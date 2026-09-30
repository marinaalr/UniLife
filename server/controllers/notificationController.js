const MongoNotification = require("../models/MongoNotification");

// Get notifications for the logged in user.
const getNotifications = async (req, res) => {
    try {
        const notifications = await MongoNotification.find({
            userId: req.user.id,
        }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch {
        res.status(500).json({
            message: "Server error.",
        });
    }
};

// Mark a notification as read.
const markAsRead = async (req, res) => {
    try {
        const notification = await MongoNotification.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id,
            },
            {
                read: true,
            },
            {
                returnDocument: "after",
            },
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found.",
            });
        }

        res.json(notification);
    } catch {
        res.status(500).json({
            message: "Server error.",
        });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
};