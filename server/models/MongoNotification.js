const mongoose = require("mongoose");

// Describe one notification
const notificationSchema = new mongoose.Schema({
    // User who receives the notification
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    // Notification text
    message: {
        type: String,
        required: true
    },

    // Notification category
    type: {
        type: String,
        required: true
    },

    // Task connected to the notification
    taskId: {
        type: Number,
        default: null
    },

    // Deadline connected to the notification
    deadline: {
        type: String,
        default: null
    },

    // Whether the notification was read
    read: {
        type: Boolean,
        default: false
    },

    // When the notification was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the MongoDB model
const MongoNotification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = MongoNotification;