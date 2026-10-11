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

import updatePassword from "../controllers/settingsController";

import "./Settings.css";

function Settings() {
    //Sparar användarens lösenordsuppg. 
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Sparar evt. felmeddelande och bekräftelsemeddelande
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle password form
const handlePasswordChange = async (event) => {
    event.preventDefault();

    //Kontrollerar att det nya lösenordet och bekräftelsen matchar
    if (newPassword !== confirmPassword) {
        setError("New passwords do not match.");
        return;
    }

    setError("");
    setSuccess("");

    // Ask the controller to handle the password change.
    const result = await updatePassword(
        currentPassword,
        newPassword,
    );

    //Visar ett felmeddelande om lösenordsbytet misslyckas
    if (!result.success) {
        setError(result.message);
        return;
    }

    // Visar bekräftelsemeddelandet frpn controllern
    setSuccess(result.message);
    //Tömmer lösenordsfältet efter ett lyckat byte
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
};

    return (
        <Box className="settings-page">
            <DashboardNavbar />

            <Box className="settings-content">
                {/* Page heading */}
                <Typography
                    variant="h3"
                    component="h1"
                    className="settings-title"
                >
                    Settings
                </Typography>

                <Typography className="settings-subtitle">
                    Manage your account settings.
                </Typography>

                {/* Password settings */}
                <Card className="settings-card" elevation={2}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            className="settings-section-title"
                        >
                            Change Password
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handlePasswordChange}
                            className="settings-form"
                        >
                            <TextField
                                fullWidth
                                label="Current Password"
                                type="password"
                                value={currentPassword}
                                onChange={(event) =>
                                    setCurrentPassword(event.target.value)
                                }
                                required
                            />

                            <TextField
                                fullWidth
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                                required
                            />

                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                className="settings-save-button"
                            >
                                Change Password
                            </Button>

                            {error && (
                                <Typography color="error">
                                    {error}
                                </Typography>
                            )}

                            {success && (
                                <Typography className="settings-success-message">
                                    {success}
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Settings;