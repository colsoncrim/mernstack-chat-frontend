import React, { useState, useContext } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login", 
                loginUser
            );
            //now we get a response back with the token and the user data 
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            //store userData in the local storage for later use
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        }   catch(err) {
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
                            placeholder="Enter your email or username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Input 
                            fluid icon="lock" 
                            iconPosition="left" 
                            type="password" 
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" color="green" fluid size="large">Log In</Button>
                     </Segment>
                </Form>
                <Message>
                    No account? <Link to="/register">Create one!</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}