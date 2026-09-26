import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";

function LoginForm() {
    const history = useHistory();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle login.
    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        identifier,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "profile",
                JSON.stringify(data.user)
            );

            history.push("/dashboard");
        } catch {
            setError("Could not connect to the server.");
        }
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