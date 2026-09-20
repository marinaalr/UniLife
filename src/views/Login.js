import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import "./Login.css"

function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        console.log("Username or Email:", identifier);
        console.log("Password:", password);
    };

    return (
        <Box className="login-page">
            <Paper className="login-card" elevation={3}>
                <Typography variant="h3" component="h1">
                    Welcome to UniLife
                </Typography>

                <Typography className="login-subtitle">
                    Log in to your account
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                >
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

                <Link
                    className="forgot-button"
                    to="/forgot-password"
                >
                    Forgot password?
                </Link>

                <Typography className="register-text">
                    Don't have an account?{" "}
                    <Link
                        className="signup-button"
                        to="/register"
                    >
                        Sign up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;