import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import Signup from "./views/sign_up";
import Events from "./views/Events";
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import TasksPage from "./views/TasksPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
                    path="/dashboard"
                    component={Dashboard}
                />

                <Route
                    path="/register"
                    component={Signup}
                />

                <Route
                    path="/events"
                    component={Events}
                />
                <Route
                    path="/profile"
                    component={Profile}
                />

                <Route
                    path="/settings"
                    component={Settings}
                />

                <ProtectedRoute
                    path="/tasks"
                    component={TasksPage}
                />


            </Switch>
        </BrowserRouter>
    );
}

export default App;