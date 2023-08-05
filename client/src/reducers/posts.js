import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

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

export const updatePost = createAsyncThunk('posts/updatePost', async params => {
    const response = await api.updatePost(params.id, params.updatedPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await api.deletePost(id);
    return id;
});

export const likePost = createAsyncThunk('posts/likeCount', async (params, { rejectWithValue }) => {
    try {
        const response = await api.likePost(params.id, params.userId);
        console.log(params.userId);
        return response.data;
    } catch (error) {
        return rejectWithValue("Log in to interact with posts")
    }

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
                postsAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                postsAdapter.removeOne(state, action.payload);
            })
            .addCase(likePost.fulfilled, (state, action) => {
                postsAdapter.upsertOne(state, action.payload);   
            })
            .addCase(likePost.rejected, (state, action) => {
                return action.payload;
            })
    }
});

export default postsSlice.reducer;
