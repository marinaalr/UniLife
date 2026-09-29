import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";

import loginController from "../controllers/loginController";

function LoginForm() {
    const history = useHistory();

    // Store the username/email entered by the user.
    const [identifier, setIdentifier] = useState("");

    // Store the password entered by the user.
    const [password, setPassword] = useState("");

    // Store login error messages.
    const [error, setError] = useState("");

    // Handle login.
    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");

        // Ask the login controller to handle the login.
        const result = await loginController(
            identifier,
            password,
        );

        // Show an error if the login was unsuccessful.
        if (!result.success) {
            setError(result.message);
            return;
        }

        // Go to the dashboard after a successful login.
        history.push("/dashboard");
    };

    return (
        <Box component="form" onSubmit={handleLogin}>
            <TextField
                fullWidth
                label="Username or Email"
                type="text"
                value={identifier}
                onChange={(event) => {
                    setIdentifier(event.target.value);
                    setError("");
                }}
                required
                margin="normal"
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                }}
                required
                margin="normal"
            />

            <Button
                className="login-button"
                type="submit"
                variant="contained"
                fullWidth
            >
                Login
            </Button>

            {error && (
                <Typography
                    color="error"
                    sx={{ marginTop: 2 }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
}

export default LoginForm;