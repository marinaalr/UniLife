import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

function LoginForm() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        console.log("Username or Email:", identifier);
        console.log("Password:", password);
    };

    return (
        <Box component="form" onSubmit={handleLogin}>
            <TextField
                fullWidth
                label="Username or Email"
                type="text"
                value={identifier}
                onChange={(event) =>
                    setIdentifier(event.target.value)
                }
                required
                margin="normal"
            />

            <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
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
        </Box>
    );
}

export default LoginForm;