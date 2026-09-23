import React from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import "./sign_up.css";

function Signup() {
    return (
        <Box className="signUp-page">
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
                    label="Username"
                    type="text"
                    required
                    margin="normal"                    
                ></TextField>

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    required
                    margin="normal"                    
                ></TextField>

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    required
                    margin="normal"                    
                ></TextField>

                <Button
                    className="signUp-button"
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Sign Up
                </Button>
            </Paper>
        </Box>
    )
}

export default Signup;