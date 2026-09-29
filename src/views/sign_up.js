import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import signupController from "../controllers/signupController";

import "./sign_up.css";

function Signup() {
    const history = useHistory();
    const [name,setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle user registration.
const handleSignup = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // Ask the controller to handle registration.
    const result = await signupController(
        name,
        username,
        email,
        password,
    );

    if (!result.success) {
        setError(result.message);
        return;
    }

    setSuccess(result.message);

    setTimeout(() => {
        history.push("/login");
    }, 1000);
};

    return (
        <Box 
            component= "form"
            onSubmit={handleSignup}
            className="signUp-page"
        >
            <Paper className="signUp-card" elevation={3}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 700,
                        fontSize: "36px"
                    }}
                >
                    Sign Up
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                    }}
                    required
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                        setError("");
                    }}
                    required
                    margin="normal"                    
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
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
                    className="signUp-button"
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Sign Up
                </Button>

                {error && (
                    <Typography
                       color="error"
                       sx={{ marginTop: 2 }}
                    >
                        {error}
                    </Typography>
                )}

                {success && (
                    <Typography
                         color="success.main"
                         sx={{ marginTop: 2 }}
                    >
                        {success}
                    </Typography>
                )}
            </Paper>
        </Box>
    )
}

export default Signup;