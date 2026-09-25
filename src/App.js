import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import HomePage from "./views/HomePage";
import ForgotPassword from "./views/ForgotPassword";
import Login from "./views/Login";
import Signup from "./views/sign_up";
import Profile from "./views/Profile";
import Settings from "./views/Settings";

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
                    path="/dashboard"
                    component={Dashboard}
                />

                <Route
                    path="/register"
                    component={Signup}
                />

                <Route
                    path="/profile"
                    component={Profile}
                />

                <Route
                    path="/settings"
                    component={Settings}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;