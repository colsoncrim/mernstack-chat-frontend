import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
// import MessageCenter from "./components/pages/MessageCenter";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";

const App = () => {
    const [userData, setUserData] = useState({
        token: undefined, 
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post("http://localhost:5000/users/tokenIsValid", null, { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:5000/users/", {
                    headers: { "x-auth-token": token },
                });
                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        }
        checkLoggedIn();
    }, []);

    return <>
        <BrowserRouter>
        {/* all components below have access to the users state (userData) via the UserContext value prop.
         The goal is for all components to have access to the currently logged in/out user */}
            <UserContext.Provider value={{ userData, setUserData }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    </>;
}

export default App;