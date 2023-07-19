import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { postsGetAll } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(postsGetAll());
    // }, [dispatch]);

    return (
        <Container maxWidth='lg'> 
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography variant='h3' align='left'>Hobby Hopper</Typography>
                <Typography variant='h6' align='right'>Sign in</Typography>    
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;
