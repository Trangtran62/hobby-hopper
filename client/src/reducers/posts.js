import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

const postsAdapter = createEntityAdapter({selectId: (instance) => instance._id});

const initialState = postsAdapter.getInitialState();

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page, { rejectWithValue }) => {
    try {
        const response = await api.fetchPosts(page);
        return response.data.posts;
    } catch (err) {
        return rejectWithValue("Can't get posts");
    }
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id, { rejectWithValue }) => {
    try {
        const response = await api.fetchPost(id);
        return response.data;
    } catch (err) {
        return rejectWithValue("Post not found");
    }
});

export const createPost = createAsyncThunk('posts/createPost', async newPost => {
    const response = await api.createPost(newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (params, { rejectWithValue }) => {
    try {
        const response = await api.updatePost(params.id, params.updatedPost);
        return response.data;
    } catch (err) {
        return rejectWithValue("Post not found");
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
    try {
        await api.deletePost(id);
        return id;
    } catch (err) {
        return rejectWithValue("Unauthenticated");
    }
});

export const likePost = createAsyncThunk('posts/likeCount', async (params, { rejectWithValue }) => {
    try {
        const response = await api.likePost(params.id, params.userId);
        return response.data;
    } catch (error) {
        return rejectWithValue("Log in to interact with posts");
    }

})

export const postComment = createAsyncThunk('posts/postComment', async (params, { rejectWithValue }) => {
    try {
        const response = await api.postComment(params.comment, params.id);
        return response.data;
    } catch (err) {
        return rejectWithValue("error: cannot post comment");
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
            .addCase(fetchPost.rejected, (state, action) => {
                return action.payload;
            })
            .addCase(createPost.fulfilled, postsAdapter.addOne)
            .addCase(createPost.rejected, (state, action) => {
                return action.payload;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                postsAdapter.upsertOne(state, action.payload);
            })
            .addCase(updatePost.rejected, (state, action) => {
                return action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                postsAdapter.removeOne(state, action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                return action.payload;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                postsAdapter.upsertOne(state, action.payload);   
            })
            .addCase(likePost.rejected, (state, action) => {
                return action.payload;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                postsAdapter.upsertOne(state, action.payload);
            })
            .addCase(postComment.rejected, (state, action) => {
                return action.payload;
            })
    }
});

export default postsSlice.reducer;
