import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../reducers/posts';
import { postCurrentId } from '../../../reducers/ids';


const Post = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePost(post._id));
    }

    const handleLike = () => {
        dispatch(likePost(post._id));
    }

    return (
        <div>
            <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white'}} size='small' onClick={() => dispatch(postCurrentId(post._id))}>
                    <MoreHorizonIcon fontSize='medium' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} ` )}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant='h5' color='secondary' gutterBottom>{post.title}</Typography>
                <Typography className={classes.details} variant='body1' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <Button size='small' color='primary' onClick={handleLike}>
                    <ThumbUpAltIcon fontSize='small' />
                    <Typography variant='caption'> Like {post.likeCount} </Typography>
                </Button>
                <Button size='small' color='primary' onClick={handleDelete}>
                    <DeleteIcon fontSize='small' />
                    <Typography variant='caption'>Delete</Typography>
                </Button>
            </CardActions>
            </Card>
        </div>
    );
};

export default Post;