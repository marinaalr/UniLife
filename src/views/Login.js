import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Paper,
    Typography
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import "./Login.css";

function Login() {
    return (
        <Box className="login-page">
            <Paper className="login-card" elevation={3}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 700,
                        fontSize: "36px"
                    }}
                >
                    Welcome to UniLife
                </Typography>

                <Typography
                    className="login-subtitle"
                    sx={{
                        fontFamily: 'Georgia, "Times New Roman", serif'
                    }}
                >
                    Log in to your account
                </Typography>

                <LoginForm />

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