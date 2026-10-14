import React, { useEffect, useState } from "react";

import { 
    Button, 
    TextField, 
    Typography, 
    Box 
} from "@mui/material";

import DashboardNavbar from './components/DashboardNavbar';

import "./Events.css"
import {
    loadEvents,
    saveUserEvents,
} from "../controllers/eventController"

function Events() {

    const [events, setEvents] = useState([]);

    const [showNewEvent, setShowNewEvent] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const [editingEventId, setEditingEventId] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            const result = await loadEvents();

            if(result.success) {
                setEvents(result.data.events);
            }
        }

        fetchEvents();
    }, []);

    async function saveEvents(updatedEvents) {
        const result = await saveUserEvents(updatedEvents);

        if(!result.success) {
            console.log("Could not save Events");
        }
    }

    const createEvent = () => {

        if(title.trim() === "") {
            return;
        }

        if(editingEventId !== null) {
            const updatedEvents = events.map((event) => {
                if(event.id === editingEventId) {
                    return{
                        ...event,
                        title: title,
                        description: description,
                        location: location,
                        date: date,
                    };
                }

                return event;
            });
            
            setEvents(updatedEvents);
            saveEvents(updatedEvents);

            setEditingEventId(null);

            setTitle("");
            setDescription("");
            setLocation("");
            setDate("");

            setShowNewEvent(false);

            return;
        }


        const newEvent = {
            id: Date.now(),
            title: title,
            description: description,
            location: location,
            date: date,
            passed: false,
        };

        const updatedEvents = [...events, newEvent];



        setEvents(updatedEvents);
        saveEvents(updatedEvents);

        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");

        setShowNewEvent(false);
    }

    function cancelNewEvent() {
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setEditingEventId(null);
        setShowNewEvent(false);
    }

    
    return (
        <>
            {/* Dashboard Navigation */}
            <DashboardNavbar/>

            {/* Main Page */}
            <Box className="event-page">

                {/* Top section */}
                <Box className="event-header">

                    <Box>
                        <Typography variant="h3" className="event-page-title">
                            Events
                        </Typography>
                    </Box>

                    {/* Open New Event Form */}
                    <Button
                        variant="contained"
                        onClick={() => setShowNewEvent(true)}
                    >
                        + New Event
                    </Button>
                </Box>

                {/* Background container */}
                <Box className="event-board">

                    {/* New Event Form */}
                    {showNewEvent && (
                        <Box className="new-event-card">
                            <Typography variant="h5">
                                {editingEventId !== null ? "Edit Event" : "Add Event"}
                            </Typography>

                            {/* Event Title */}
                            <TextField
                            label="Event name"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            />

                            {/* Event description */}
                            <TextField
                                label="Description"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}                            
                            />

                            {/* Event location */}
                            <TextField
                                label="Location"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                            />

                            {/* Event date */}
                            <Box>
                                <Typography className="input-label">
                                    Date and Time
                                </Typography>

                                <TextField
                                    type="date"
                                    fullWidth
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                />
                            </Box>

                            {/* Form Buttons */}
                            <Box>
                                <Button onClick={cancelNewEvent}>
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={createEvent}
                                >
                                    {editingEventId !== null ? "Save Changes" : "Add Event"}
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Message when there are no upcoming events */}
                    {!showNewEvent && events.length === 0 && (
                        <Typography className="no-events">
                            There are no upcoming events currently
                        </Typography>
                    )}

                    {/* Show all events */}
                    {editingEventId === null && events.map((event) => (
                        <Box
                            className={`event-card ${event.passed ? "passed-event" : ""}`}
                            key={event.id}
                        >
                            <Box className="event-content">

                                {/* Event Title */}
                                <Typography variant="h6">
                                    {event.title}
                                </Typography>

                                {/* Event Description */}
                                {event.description && (
                                    <Typography className="event-description">
                                        {event.description}
                                    </Typography>
                                )}

                                {/* Event Location */}
                                {event.location && (
                                    <Typography className="event-location">
                                        Location: {event.location}
                                    </Typography>
                                )}

                                {/* Event Date */}
                                {event.date && (
                                    <Typography className="event-date">
                                        Date: {event.date}
                                    </Typography>
                                )}
                            </Box>

                            {/* Subscribe to Event */}

                            {/* Edit the Event */}

                            {/* Delete the Event */}
                        </Box>
                    ))}
                </Box>
            </Box>
        </>        
    );
}

export default Events;