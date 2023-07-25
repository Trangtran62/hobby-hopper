import React, { useEffect } from "react";
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles';
import { fetchPosts } from '../../reducers/posts';

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentId = useSelector((state) => state.ids.currentId);
    const postsLength = useSelector((state) => Object.keys(state.posts.entities).length);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [currentId, dispatch, postsLength]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;