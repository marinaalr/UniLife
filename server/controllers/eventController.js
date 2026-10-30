const MongoEvent = require("../models/MongoEvents");
const MongoNotification = require("../models/MongoNotification");

// Get the User's events
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

// Save the User's events
const saveEvents = async (req, res) => {
    try {
        const { events } = req.body;

        if(!Array.isArray(events)) {
            return res.status(400).json({
                message: "Invalid event data"
            });
        }

        // Save the events
        const savedEvent = await MongoEvent.findOneAndUpdate(
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
        
        // Get all the event IDs
        const currentEventIds = events.map((event) => event.id);

        // Remove notifications for events that no longer exist
        await MongoNotification.deleteMany({
            userId: req.user.id,
            type: "event_date",
            taskId: {
                $nin: currentEventIds,
            },
        });

        // Calculate Current Date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate Date 5 days form now
        const fiveDaysFromNow = new Date(today);
        fiveDaysFromNow.setDate(today.getDate() + 5);

        // Create/Update/Remove Event Notifications
        for(const event of events){
            // Remove Event Notifications Without A Date
            if(!event.date){
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "event_date",
                    taskId: event.id,
                });

                continue;
            }

            const eventDate = new Date(`${event.date}`);

            // Remove Event Notifications For Events
            // More than 5 Days From Now
            if(eventDate < today || eventDate > fiveDaysFromNow) {
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "event_date",
                    taskId: event.id,
                });

                continue;
            }

            // Calculate Days Until Event
            const difference = eventDate - today;

            const daysLeft = Math.round(
                difference / (1000 * 60 * 60 * 24),
            );

            // Create Notification Message
            let message;

            if(daysLeft === 0) {
                message = `Event "${event.title}" occurs today`;
            }else if(daysLeft === 1){
                message = `Event "${event.title}" occurs tomorrow`;
            }else{
                message = `Event "${event.title}" occurs in ${daysLeft} days`;
            }

            // Check If Notification Exists
            const existingNotification = 
                await MongoNotification.findOne({
                    userId: req.user.id,
                    type: "event_date",
                    taskId: event.id,
                });
            
            if(!existingNotification) {

                // Create Notification
                await MongoNotification.create({
                    userId: req.user.id,
                    message,
                    type: "event_date",
                    taskId: event.id,
                    deadline: event.date,
                    read:false,
                });
            }else{
                
            }
        }

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

