import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost, updatePost } from '../../../reducers/posts';
import { postCurrentId } from '../../../reducers/ids';
import Swal from 'sweetalert2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const nav = useNavigate();

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return post.likes.find((like) => like === user?.result?._id)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length}` }</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length}</>
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

    const handleToggle = async () => {
        const result = await dispatch(updatePost({id: post._id, updatedPost: { ...post, trade: !post.trade }}));

        if (result.error) {
            const newError = JSON.stringify(result.payload);
            Swal.fire({ text: newError, icon: 'error' });
        }
    }

    const openPost = () => {
        nav(`/posts/${post._id}`);
    }

    return (
        <div>
            <Card className={classes.card}>
                <ButtonBase className={classes.cardAction} onClick={openPost}>  
                    <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
                    <div className={classes.overlay}>
                        <Typography variant='body2'>{post.creator}</Typography>
                        <Typography variant='body2'>{moment(post.createAt).fromNow()}</Typography>
                    </div>
                    <div className={classes.details}>
                        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} ` )}</Typography>
                    </div>
                    <CardContent>
                        <Typography className={classes.title} variant='h5' color='secondary' gutterBottom>{post.title}</Typography>
                        <Typography className={classes.details} variant='body1' gutterBottom>{post.message}</Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions className={classes.CardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                        <Likes />
                    </Button>
                    <Button size='small' color='primary' disabled={(user?.result.name !== post?.creator)} onClick={handleDelete}>
                        <DeleteIcon fontSize='small' />
                        <Typography variant='caption'>Delete</Typography>
                    </Button>                
                    <Button color="primary" size='small' disabled={(user?.result.name !== post?.creator)} onClick={() => dispatch(postCurrentId(post._id))}>
                        <MoreHorizonIcon fontSize='small' />Edit
                    </Button>
                    <FormControlLabel control={<Switch checked={post.trade} onChange={handleToggle} color="secondary" size="small" />} label={(user?.result.name === post?.creator) ? <Typography variant='caption' color='primary'>TRADED</Typography> : "Traded"} disabled={(user?.result.name !== post?.creator)} />
                </CardActions>
            </Card>
        </div>
    );
};

export default Post;