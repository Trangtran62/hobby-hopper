import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../reducers/users";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const classes = useStyles();
    const user = useSelector((state) => (state.users.currentUser ? state.users.currentUser : null));
    const dispatch = useDispatch();
    const nav = useNavigate();

    const logOut = () => {
        dispatch(clearUser());
        nav('/auth');
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h3' align='left'>Hobby Hopper</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <div className={classes.userName}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}></Avatar>
                            <Typography variant="h6">{user.result.name}</Typography>
                        </div>
                        <Button variant="outlined" color="primary" size="small" onClick={logOut}>Log Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="outlined" size="small" color="primary">Sign In</Button>
                )}
            </Toolbar>    
        </AppBar>
    )
};

export default Navbar;