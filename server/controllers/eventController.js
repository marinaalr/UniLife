const MongoEvent = require("../models/MongoEvents");
const MongoNotification = require("../models/MongoNotification");

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
        
        const currentEventIds = events.map((event) => event.id);

        await MongoNotification.deleteMany({
            userId: req.user.id,
            type: "event_date",
            taskId: {
                $nin: currentEventIds,
            },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const fiveDaysFromNow = new Date(today);
        fiveDaysFromNow.setDate(today.getDate() + 5);

        for(const event of events){
            if(!event.date){
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "event_date",
                    taskId: event.id,
                });

                continue;
            }

            const eventDate = new Date(`${event.date}`);

            if(eventDate < today || eventDate > fiveDaysFromNow) {
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "event_date",
                    taskId: event.id,
                });

                continue;
            }

            const difference = eventDate - today;

            const daysLeft = Math.round(
                difference / (1000 * 60 * 60 * 24),
            );

            let message;

            if(daysLeft === 0) {
                message = `Event "${event.title}" occurs today`;
            }else if(daysLeft === 1){
                message = `Event "${event.title}" occurs tomorrow`;
            }else{
                message = `Event "${event.title}" occurs in ${daysLeft} days`;
            }

            const existingNotification = 
                await MongoNotification.findOne({
                    userId: req.user.id,
                    type: "event_date",
                    taskId: event.id,
                });
            
            if(!existingNotification) {
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

