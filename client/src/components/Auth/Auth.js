import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './styles';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Input from './Input';

const Auth = () => {
    const classes = useStyles();
    const isSignup = false;
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {};
    const handleChange = () => {};

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LoginOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                                <>
                                    <Input 
                                        name="firstName" 
                                        label="First Name" 
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input 
                                        name="firstName" 
                                        label="First Name" 
                                        handleChange={handleChange}
                                        half
                                    />                             
                                </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type="ps" />
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;