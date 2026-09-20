import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ForgotPassword from "./views/ForgotPassword";

import Login from "./views/Login";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <div>UniLife Start Page</div>}
                />

                <Route
                    path="/login"
                    component={Login}
                />

                <Route
                   path="/forgot-password"
                   component={ForgotPassword}
                />

            </Switch>
        </BrowserRouter>
    );
}

export default App;