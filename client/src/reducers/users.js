import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

const usersAdapter = createEntityAdapter({selectId: (instance) => instance._id});

const initialState = usersAdapter.getInitialState();

export const signin = createAsyncThunk();

export const signup = createAsyncThunk();

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        postUser(state, action) {
            state.currentUser = action.payload;
        },
        clearUser(state, action) {
            state.currentUser = undefined;
        }
    },
    extraReducers: builder => {
        builder
            .addCase()
    }
});

export const { postUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;