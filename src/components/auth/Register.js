import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header color="green">
                {/* <Image /> */}
                LOGO HERE
            </Header>
            <Form size="large">
                <Segment raised>
                    <Form.Input fluid icon="user" iconPosition="left" placeholder="Enter your email address" />
                    <Form.Input fluid icon="lock" iconPosition="left"  type="password" placeholder="Create a password" />
                    <Form.Input fluid icon="lock" iconPosition="left"  type="password" placeholder="Confirm your password" />
                    <Button color="green" fluid size="large">Register</Button>
                 </Segment>
            </Form>
        </Grid.Column>
    </Grid>
    )
}

export default Register;