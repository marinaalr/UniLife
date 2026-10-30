const mongoose = require("mongoose");

// Describe One Event
const eventSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        description: String,
        location: String,
        date: String,
        passed: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    },
);

// Store User Events
const subscribedEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },

    events: {
        type: [eventSchema],
        default: [],
    },
});

// Create MongoDB Model
const MongoEvent = mongoose.model("Event", subscribedEventSchema);

module.exports = MongoEvent;