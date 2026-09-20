import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Link
} from "@mui/material";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage("A password reset request has been submitted.");
    };

    return (
        <Box className="forgot-page">
            <Paper className="forgot-card" elevation={3}>
                <Typography variant="h3" component="h1">
                    Forgot Password?
                </Typography>

                <Typography className="forgot-subtitle">
                    Enter your email address to reset your password.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                        margin="normal"
                    />

                    <Button
                        className="reset-button"
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Reset Password
                    </Button>
                </Box>

                {message && (
                    <Typography className="forgot-message">
                        {message}
                    </Typography>
                )}

                <Link
                    component={RouterLink}
                    to="/login"
                    className="back-login-button"
                >
                    Back to Login
                </Link>
            </Paper>
        </Box>
    );
}

export default ForgotPassword;