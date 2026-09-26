import { useState } from "react";
import { Button, TextField, Toolbar, Typography, Box } from "@mui/material";
import "./Events.css"
import Navbar from './components/Navbar';

function Events() {
    const [isOpen, setIsOpen] = useState(false);

    const [events, setEvents] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const createEvent = () => {
        const newEvent = {
            id: Date.now(),
            name,
            date,
            location
        };

        setEvents([...events, newEvent]);

        setName("");
        setDate("");
        setLocation("");
    };
    return (
        <Box className="eventPage">
            <Navbar />

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
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                            <TextField
                                fullWidth
                                label="Location"
                                type="text"
                                required
                                margin="normal"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                            />

                            <TextField
                                fullWidth
                                type="date"
                                required
                                margin="normal"
                                value={date}
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
            <div className="eventBox">
                {events.map((event) => (
                    <div className="eventDisplay" key={event.id}>
                        <h2 className="eventName">{event.name}</h2>
                        <p className="info">{event.location} {event.date} </p>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default Events;