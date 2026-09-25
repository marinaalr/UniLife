import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import "./sign_up.css";

function Signup() {
    const history = useHistory();
    const [name,setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setSuccess("Account created successfully.");

            setTimeout(() => {
                history.push("/login");
            }, 1000);
        } catch {
            setError("Could not connect to the server.");
        }
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