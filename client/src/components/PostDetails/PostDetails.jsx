import React from "react";
import { Paper, Typography, Divider } from '@material-ui/core';
import {  useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import useStyles from './styles';
import moment from 'moment';
import CommentSection from './CommentSection';

const PostDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const post = useSelector((state) => state.posts.entities[id]);

    return (
        <Paper>
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="h6" component="p">{post.message}</Typography>
                <Typography variant="body1">Created by: {post.creator}</Typography>
                <Typography variant="body1">{moment(post.createAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post} />
                <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
        </div>
        </Paper>
    )
};

export default PostDetails;