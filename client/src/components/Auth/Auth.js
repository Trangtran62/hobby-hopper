import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Input from './Input';
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { signin, signup, postUser } from '../../reducers/users';
import Swal from 'sweetalert2';

const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Auth = () => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSignup) {
            const result = await dispatch(signup({form: formData, nav}));
            
            if (result.error) {
                const newError = JSON.stringify(result.payload);
                Swal.fire({text: newError, icon: 'error'});
            };
        } else {
            const result = await dispatch(signin({form: formData, nav}));

            if (result.error) {
                const newError = JSON.stringify(result.payload);
                Swal.fire({text: newError, icon: 'error'});
            };
        }
    };
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => setIsSignup(!isSignup);

    const googleSuccess = async (res) => {
        const result = jwt_decode(res?.credential);
        const user = {
            result: {
                _id: result.sub,
                name: result.name,
                picture: result.picture,
            },
            token: res?.credential
        };
        
        try {
            dispatch(postUser(user));
            nav('/');
        } catch (err) {
            console.log(err);
        }
    }

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
                                        name="lastName" 
                                        label="Last Name" 
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />                             
                                </>
                        )}
                        <Input 
                            name="email" 
                            label="Email Address" 
                            handleChange={handleChange} 
                            type="email" 
                        />
                        <Input 
                            name="password" 
                            label="Password" 
                            handleChange={handleChange} 
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input 
                                name="confirmPassword" 
                                label="Confirm Password" 
                                handleChange={handleChange} 
                                type="password" 
                            />
                        )}
                    </Grid>
                    <Button type="submit" fullWidth variant="outlined" color="primary" className={classes.submit} size="small">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <Grid container justifyContent="center">
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={(err) => console.log(err)}
                        />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button className={classes.button} onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;