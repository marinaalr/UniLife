import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import DashboardNavbar from "./components/DashboardNavbar";
import "./Profile.css";

function Profile() {
    const savedProfile = JSON.parse(
        localStorage.getItem("profile")
    ) || {
        name: "",
        username: "",
        email: ""
    };

    const [name, setName] = useState(savedProfile.name);
    const [username, setUsername] = useState(savedProfile.username);
    const [email, setEmail] = useState(savedProfile.email);
    const [saved, setSaved] = useState(false);

    const handleSave = (event) => {
        event.preventDefault();

        const profileData = {
            name,
            username,
            email
        };

        localStorage.setItem(
            "profile",
            JSON.stringify(profileData)
        );

        setSaved(true);
    };

    return (
        <Box className="profile-page">
            <DashboardNavbar />

            <Box className="profile-content">
                <Box className="profile-introduction">
                    <Typography
                        variant="h3"
                        component="h1"
                        className="profile-title"
                    >
                        Profile
                    </Typography>

                    <Typography className="profile-subtitle">
                        Manage your personal information and account.
                    </Typography>
                </Box>

                <Card className="profile-card" elevation={2}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            className="profile-section-title"
                        >
                            Personal Information
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleSave}
                            className="profile-form"
                        >
                            <TextField
                                fullWidth
                                label="Name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                    setSaved(false);
                                }}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                    setSaved(false);
                                }}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setSaved(false);
                                }}
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                className="profile-save-button"
                            >
                                Save Changes
                            </Button>

                            {saved && (
                                <Typography className="profile-saved-message">
                                    Changes saved successfully.
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Profile;