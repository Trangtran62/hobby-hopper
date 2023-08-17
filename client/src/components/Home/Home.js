import React, { useEffect } from "react";
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles';
import { fetchPosts } from '../../reducers/posts';
import { useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;

    const dispatch = useDispatch();
    const currentId = useSelector((state) => state.ids.currentId);
    const postsLength = useSelector((state) => Object.keys(state.posts.entities).length);

    useEffect(() => {
        dispatch(fetchPosts(page));
    }, [currentId, dispatch, postsLength, page]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <Posts />
                        <Pagination page={page} />
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