import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./views/HomePage";
import ForgotPassword from "./views/ForgotPassword";
import Login from "./views/Login";
import Signup from "./views/sign_up";
import Events from "./views/Events";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={HomePage}
                />

                <Route
                    path="/login"
                    component={Login}
                />

                <Route
                    path="/forgot-password"
                    component={ForgotPassword}
                />

                <Route
                    path="/register"
                    component={Signup}
                />

                <Route
                    path="/events"
                    component={Events}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;