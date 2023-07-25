import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    const user = null;

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h3' align='left'>Hobby Hopper</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.given_name} src={user.result.imageUrl}>{user.result.given_name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.give_name}</Typography>
                        <Button variant="outlined" className={classes.logout} color="secondary" onClick={() => {}}>Log Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="outlined" size="small">Sign In</Button>
                )}
            </Toolbar>    
        </AppBar>
    )
};

export default Navbar;