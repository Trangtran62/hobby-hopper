import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const Posts = () => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles();

    useEffect(() => {}, [posts]);

    return (
        !posts.ids.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.ids.map((id) => (
                        <Grid key={id} item xs={12} sm={6}>
                            <Post post={posts.entities[id]} />
                        </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;