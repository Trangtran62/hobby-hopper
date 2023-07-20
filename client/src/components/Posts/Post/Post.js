import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../reducers/posts';
import { postCurrentId } from '../../../reducers/ids';


const Post = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);

    const handleDelete = () => {
        dispatch(deletePost(post._id));
        setShow(false);
    }

    return (
        <div>
            { show ? (
            <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white'}} size='small' onClick={() => dispatch(postCurrentId(post._id))}>
                    <MoreHorizonIcon fontSize='default' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag } `)}</Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant='h5' color='secondary' gutterBottom>{post.title}</Typography>
                <Typography className={classes.details} variant='body' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <Button size='small' color='primary' onClick={() => {}}>
                    <ThumbUpAltIcon fontSize='small' />
                    Like
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={handleDelete}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
            </Card>
            ) : null
            }
        </div>
    );
};

export default Post;