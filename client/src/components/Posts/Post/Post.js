import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../reducers/posts';
import { postCurrentId } from '../../../reducers/ids';
import Swal from 'sweetalert2';


const Post = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.currentUser);
    console.log(user?.result?.name);   
    console.log(post?.creator);
    console.log((user?.result.name !== post.creator)); 

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return post.likes.find((like) => like === user?.result?._id)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const handleDelete = async () => {
        const result = await dispatch(deletePost(post._id));
        
        if (result.error) {
            const newError = JSON.stringify(result.payload);
            Swal.fire({text: newError, icon: 'error'});
        }
    }

    const handleLike = async () => {
        const result = await dispatch(likePost({ id: post._id, userId: user?.result._id }));
        
        if (result.error) {
            const newError = JSON.stringify(result.payload);
            Swal.fire({text: newError, icon: 'error'});
        }
    }

    return (
        <div>
            <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='body2'>{post.creator}</Typography>
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
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                <Button size='small' color='primary' disabled={(user?.result.name !== post.creator)} onClick={handleDelete}>
                    <DeleteIcon fontSize='small' />
                    <Typography variant='caption'>Delete</Typography>
                </Button>
            </CardActions>
            </Card>
        </div>
    );
};

export default Post;