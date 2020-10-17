import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import HomeNavigation from "../auth/HomeNavigation";

const Home = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) history.push("/login");
    }, [userData])

    return (
        <HomeNavigation />
    )
}

export default Home;