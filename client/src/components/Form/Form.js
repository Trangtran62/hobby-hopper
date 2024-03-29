import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../reducers/posts';
import { clearCurrentId } from '../../reducers/ids';
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EmojiPicker from 'emoji-picker-react';

const Form = () => {
    const user = useSelector((state) => (state.users.currentUser ? state.users.currentUser : null));

    const initialData = {
        creator: '',
        title: '',
        message: '',
        tags: '',
        category: '',
        selectedFile: ''
    };

    const categoryList = ['Arts&Crafts', 'Fitness', 'Gardening', 'Boardgame', 'Electronics', 'Cooking', 'Others'];
    const [postData, setPostData] = useState({ ...initialData });
    const currentId = useSelector((state) => state.ids.currentId);
    const post = useSelector((state) => currentId ? state.posts.entities[currentId] : null)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) {
            setPostData(post);
        } else {
            setPostData({ ...initialData, creator: user?.result.name });
        }

    }, [post, user]);

    const clear = () => {
        dispatch(clearCurrentId());
        setPostData({ ...initialData, creator: user?.result.name });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentId !== undefined) {
            dispatch(updatePost({id: currentId, updatedPost: postData}));
        } else {
            dispatch(createPost(postData)); 
        };

        clear();
    };

    const handleEmoji = (emojiData) => {
        setPostData({ ...postData, message: postData.message + ' ' + emojiData.emoji });
    };

    // Drop down menu styling for category
    const minimalSelectClasses = useMinimalSelectStyles();

    const iconComponent = (props) => {
        return (
        <ExpandMoreIcon className={props.className + " " + minimalSelectClasses.icon}/>
        )};

    // moves the menu below the select input
    const menuProps = {
        classes: {
        paper: minimalSelectClasses.paper,
        list: minimalSelectClasses.list
        },
        anchorOrigin: {
        vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
        vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };


    return (
        <>
        {user ? (
        <Paper className={classes.paper}>
            <form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Edit' : 'Create' } a Post</Typography>
                <TextField 
                    required
                    margin='dense'
                    color='secondary'
                    InputLabelProps={{ shrink: true, className: classes.label }}
                    InputProps={{ classes: { notchedOutline: classes.notchedOutline } }}
                    name='creator' 
                    variant='outlined' 
                    label='Creator'
                    fullWidth
                    value={user?.result.name}
                    onChange={(event) => setPostData({ ...postData, creator: event.target.value })}
                />
                <TextField 
                    required
                    margin='dense'
                    color='secondary'
                    InputLabelProps={{ shrink: true, className: classes.label }}
                    InputProps={{ classes: { notchedOutline: classes.notchedOutline }}}
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth
                    value={postData.title ? postData.title : ''}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />
                <div>
                    <TextField 
                        required
                        margin='dense'
                        color='secondary'
                        InputLabelProps={{ shrink: true, className: classes.label }}
                        InputProps={{ classes: { notchedOutline: classes.notchedOutline }}}
                        multiline
                        name='message' 
                        variant='outlined' 
                        label='Message' 
                        fullWidth
                        value={postData.message ? postData.message : ''}
                        minRows={4}
                        onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                    />
                    <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
                <TextField 
                    margin='dense'
                    color='secondary'
                    InputLabelProps={{ shrink: true, className: classes.label }}
                    InputProps={{ classes: { notchedOutline: classes.notchedOutline }}}
                    name='tags' 
                    variant='outlined' 
                    label='Tags' 
                    helperText='Comma separated, no white space'
                    fullWidth
                    value={postData.tags ? postData.tags : ''}
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(",")})}
                />
                <FormControl required variant='filled' fullWidth margin='dense'>
                    <InputLabel className={ classes.label }>Category</InputLabel>
                    <Select
                        disableUnderline
                        MenuProps={menuProps}
                        IconComponent={iconComponent}
                        name='category'
                        label='Category'
                        value={postData.category ? postData.category : 'Others'}
                        onChange={(event) => setPostData({ ...postData, category: event.target.value})}
                    >
                        {categoryList.map((item) => (
                            <MenuItem key={categoryList.indexOf(item)} value={item}>{ item }</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className={classes.fileInput}>
                    <FileBase
                        required
                        type='file'
                        multiple={false}
                        value={postData.selectedFile}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='outlined' color='primary' size='small' type='submit' fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant='outlined' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
        ) : null }
        </>
    );
};

export default Form;

