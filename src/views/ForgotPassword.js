import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage("A password reset request has been submitted.");
    };

    return (
        <div className="forgot-page">
            <div className="forgot-card">
                <h1>Forgot Password?</h1>

                <p className="forgot-subtitle">
                    Enter your email address to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="forgot-form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        className="reset-button"
                        type="submit"
                    >
                        Reset Password
                    </button>
                </form>

                {message && (
                    <p className="forgot-message">
                        {message}
                    </p>
                )}

                <Link
                    className="back-login-button"
                    to="/login"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}

export default ForgotPassword;