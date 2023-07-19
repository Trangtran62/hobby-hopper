import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost } from '../../reducers/posts';

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        category: '',
        selectedFile: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createPost(postData));
    };
    
    const clear = () => {

    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
            <Typography variant='h6'>Create a Post</Typography>
            <TextField 
                name='creator' 
                variant='outlined' 
                label='Creator' 
                fullWidth
                value={postData.creator}
                onChange={(event) => setPostData({ ...postData, creator: event.target.value })}
            />
            <TextField 
                name='title' 
                variant='outlined' 
                label='Title' 
                fullWidth
                value={postData.title}
                onChange={(event) => setPostData({ ...postData, title: event.target.value })}
            />
            <TextField 
                name='message' 
                variant='outlined' 
                label='Message' 
                fullWidth
                value={postData.message}
                onChange={(event) => setPostData({ ...postData, message: event.target.value })}
            />
            <TextField 
                name='tags' 
                variant='outlined' 
                label='Tags' 
                fullWidth
                value={postData.tags}
                onChange={(event) => setPostData({ ...postData, tags: event.target.value })}
            />
            <FormControl variant='outlined' fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name='category'
                    variant='outlined'
                    label='Category'
                    value={postData.category}
                    onChange={(event) => setPostData({ ...postData, category: event.target.value})}
                >
                    <MenuItem value={'Arts&Crafts'}>Arts&Crafts</MenuItem>
                    <MenuItem value={'Fitness'}>Fitness</MenuItem>
                    <MenuItem value={'Gardening'}>Gardening</MenuItem>
                    <MenuItem value={'Boardgame'}>Boardgame</MenuItem>
                    <MenuItem value={'Electronics'}>Electronics</MenuItem>
                    <MenuItem value={'Cooking'}>Cooking</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
            </FormControl>
            <div className={classes.fileInput}>
                <FileBase
                    type='file'
                    multiple={false}
                    onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 }) }
                />
            </div>
            <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
            <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;