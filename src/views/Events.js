import { useState } from "react";
import { Button, TextField, Toolbar, Typography } from "@mui/material";
import "./Events.css"
import Navbar from './components/Navbar';


function Events() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <box>
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
                            />

                            <TextField
                                fullWidth
                                label="Location"
                                type="text"
                                required
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                type="date"
                                required
                                margin="normal"
                            />

                            <Button>
                                Create
                            </Button>

                            <Button onClick={() => setIsOpen(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Toolbar>
        </box>
    )
}

export default Events;