import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';
// import { createTheme } from '@material-ui/core';

const postsAdapter = createEntityAdapter({selectId: (instance) => instance._id});

const initialState = postsAdapter.getInitialState();

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await api.fetchPosts();
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async newPost => {
    const response = await api.createPost(newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (id, updatedPost) => {
    const response = await api.updatePost(id, updatedPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await api.deletePost(id);
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                postsAdapter.setAll(state, action.payload);
            })
            .addCase(createPost.fulfilled, postsAdapter.addOne)
            .addCase(updatePost.fulfilled, (state, action) => {
                const { _id, ...changes } = action.payload;
                postsAdapter.updateOne(state, { _id, changes });
            })
            .addCase(deletePost.fulfilled, postsAdapter.removeOne)
    }
});

export default postsSlice.reducer;
