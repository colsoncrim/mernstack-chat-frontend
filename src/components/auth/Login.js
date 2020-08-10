import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color="green">
                    {/* <Image /> */}
                    LOGO HERE
                </Header>
                <Form size="large">
                    <Segment raised>
                        <Form.Input fluid icon="user" iconPosition="left" placeholder="Enter your email or username" />
                        <Form.Input fluid icon="lock" iconPosition="left"  type="password" placeholder="Enter your password" />
                        <Button color="green" fluid size="large">Log In</Button>
                     </Segment>
                </Form>
                <Message>
                    No account? <Link to="/register">Create one!</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login;