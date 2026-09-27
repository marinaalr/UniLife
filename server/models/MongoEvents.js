const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        id: Number,
        titel: String,
        location: String,
        date: Date,
    },
    {
        _id: false,
    },
);

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

const MongoEvent = mongoose.model("Event", subscribedEventSchema);

module.exports = MongoEvent;