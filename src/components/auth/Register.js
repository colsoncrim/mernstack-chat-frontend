import React, { useState, useContext } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {

    const [email, setEmail] = useState();
    const [displayName, setdisplayName] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setpasswordCheck] = useState();
    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { email, displayName, password, passwordCheck };
            await Axios.post(
                "http://localhost:5000/users/register",
                newUser
            );

            //We have registered the user, now we'll log them in
            const loginRes = await Axios.post("http://localhost:5000/users/login", {
                email,
                password
            });
            //now we get a response back with the token and the user data 
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            //store userData in the local storage for later use
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header color="green">
                {/* <Image /> */}
                LOGO HERE
            </Header>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <Form size="large" onSubmit={submit}>
                <Segment raised>
                    <Form.Input 
                        fluid icon="user" 
                        iconPosition="left" 
                        placeholder="Enter your email address" 
                        onChange={(e) => setEmail(e.target.value)} //sets the email state to the current input value
                    />
                    <Form.Input 
                        fluid icon="user" 
                        iconPosition="left" 
                        placeholder="Create a unique username (Optional)" 
                        onChange={(e) => setdisplayName(e.target.value)}
                    />
                    <Form.Input 
                        fluid icon="lock" 
                        iconPosition="left"  
                        type="password" 
                        placeholder="Create a password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Input 
                        fluid icon="lock" 
                        iconPosition="left"  
                        type="password" 
                        placeholder="Confirm your password"
                        onChange={(e) => setpasswordCheck(e.target.value)}
                    />
                    <Button type="submit" color="green" fluid size="large">Register</Button>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
    )
}