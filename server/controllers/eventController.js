const MongoEvent = require("../models/MongoEvents");

const getEvents = async (req, res) => {
    try {
        const userEvents = await MongoEvent.findOne({
            userId: req.user.id,
        });

        res.json({
            events: userEvents ? userEvents.events : [],
        });
    }catch{
        res.status(500).json({
            message: "Server error"
        });
    }
};

const saveEvents = async (req, res) => {
    try {
        const { events } = req.body;

        if(!Array.isArray(events)) {
            return res.status(400).json({
                message: "Invalid event data"
            });
        }

        const savedEvent = await MongoEvent.FindOneAndUpdate(
            {
                userId: req.user.id,
            },
            {
                userId: req.user.id,
                events: events,
            },
            {
                new: true,
                upsert: true,
            },
        );

        res.json({
            message: "Event saved successfully",
            events: savedEvent.events,
        });
    }catch{
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getEvents,
    saveEvents
};