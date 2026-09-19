import React, { useState } from "react";

function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();

        console.log("Username or Email:", identifier);
        console.log("Password:", password);
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    const handleRegister = () => {
        console.log("Register clicked");
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="identifier">Username or Email</label>
                    <input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(event) => setIdentifier(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                       id="password"
                       type="password"
                       value={password}
                       onChange={(event) => setPassword(event.target.value)}
                       required
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <button type ="button" onClick={handleForgotPassword}>
                Forgot password?
            </button>

            <p>
                Don't have an account?{" "}
                <button type="button" onClick={handleRegister}>
                    Sign up
                </button>
            </p>
        </div>
    );
}

export default Login;