import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({status: 'idle'});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await api.fetchPosts();
    return response;
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
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                postsAdapter.setAll(state, action.payload);
                state.status = 'idle';
            })
    }
});

export const { postCreated } = postsSlice.actions;
export default postsSlice.reducer;
