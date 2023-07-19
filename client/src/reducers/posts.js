import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

const postsAdapter = createEntityAdapter({selectId: (instance) => instance._id});

const initialState = postsAdapter.getInitialState({status: 'idle'});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await api.fetchPosts();
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async newPost => {
    const response = await api.createPost(newPost);
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postCreated(state, action) {
            return state;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                postsAdapter.setAll(state, action.payload);
                state.status = 'idle';
            })
            .addCase(createPost.fulfilled, postsAdapter.addOne)
    }
});

export const { postCreated } = postsSlice.actions;
export default postsSlice.reducer;
