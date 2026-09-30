import { useEffect, useState } from "react";
import { Button, TextField, Toolbar, Typography, Box } from "@mui/material";
import "./Events.css"
import DashboardNavbar from './components/DashboardNavbar';

function Events() {
    const [isOpen, setIsOpen] = useState(false);

    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    const [eventName, setName] = useState("");
    const [eventLocation, setLocation] = useState("");
    const [eventDate, setDate] = useState("");

    const createEvent = () => {
        const newEvent = {
            id: Date.now(),
            eventName,
            eventLocation,
            eventDate
        };

        setEvents([...events, newEvent]);

        setName("");
        setDate("");
        setLocation("");

        setIsOpen(false);
    };

    useEffect(() => {
        async function loadEvents() {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:5000/api/events",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if(response.ok) {
                    setEvents(data.events);
                }

                setEventsLoaded(true);
            } catch {
                console.log("Could not load events");
            }
        }

        loadEvents();
    }, []);

    useEffect(() => {
        async function saveEvents() {
            const token = localStorage.getItem("token");

            try {
                await fetch(
                    "http://localhost:5000/api/events",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            events: events
                        })
                    }
                );
            } catch {
                console.log("Could not save events");
            }
        }

        saveEvents();
    }, [events, eventsLoaded])
    return (
        <Box className="eventPage">
            <DashboardNavbar />

            <Toolbar className="event-toolbar">

                <TextField
                    label="Search"
                    type="text"
                    margin="normal"
                    className="searchBar"
                />

                <Button>
                    Filter
                </Button>
                <Button onClick={() => setIsOpen(true)}>
                    Add
                </Button>

                {isOpen && (
                    <div className="addEventWindow">
                        <div
                            className="popup"
                            component="form"
                            onClick={(e) => e.stopPropagation}
                        >
                            <Typography
                                variant="h3"
                                component="h1"
                                sx={{
                                    fontFamily: 'Georgia, "Times New Roman", serif',
                                    fontWeight: 700,
                                    fontSize: "36px"
                                }}
                            >
                                Create Event
                            </Typography>              

                            <TextField
                                fullWidth
                                label="Name"
                                type="text"
                                required
                                margin="normal"
                                value={eventName}
                                onChange={(event) => setName(event.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Location"
                                type="text"
                                required
                                margin="normal"
                                value={eventLocation}
                                onChange={(event) => setLocation(event.target.value)}
                            />

                            <TextField
                                fullWidth
                                type="date"
                                required
                                margin="normal"
                                value={eventDate}
                                onChange={(event) => setDate(event.target.value)}
                            />

                            <Button onClick={createEvent}>
                                Create
                            </Button>

                            <Button onClick={() => setIsOpen(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Toolbar>
            <Box className="eventBox">
                {events.map((event) => (
                    <div className="eventDisplay" key={event.id}>
                        <h2 className="eventName">{event.eventName}</h2>
                        <p className="info">{event.eventLocation} {event.eventDate} </p>
                    </div>
                ))}
            </Box>
        </Box>
    )
}

export default Events;