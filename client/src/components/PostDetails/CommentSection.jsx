import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from '../styles';
import { postComment } from '../../reducers/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(postComment({ comment: finalComment, id: post._id }));
        setComments(newComments.payload.comments);
        setComment('');
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                </div>
                {user?.result?.name && (
                    <div style={{ width: "70%"}}>
                        <Typography gutterBottom variant="h6" color="primary">Post a Comment</Typography>
                        <TextField 
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                        <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;