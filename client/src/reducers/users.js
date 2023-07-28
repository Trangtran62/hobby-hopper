import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const signin = createAsyncThunk('users/signin', async (params) => {
    const response = await api.signIn(params.form);
    const nav = params.nav;
    await nav('/');
    return response;
});

export const signup = createAsyncThunk('users/signup', async (params) => {
    const response = await api.signUp(params.form)
    const nav = params.nav;
    await nav('/');
    return response;
});

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
            .addCase(signin.fulfilled, (state, action) => {
                state.currentUser = action.payload.data;
                // if (data.status === 200) {
                //     state.currentUser = data.result;
                // } else {
                //     console.log(data.message);
                // }
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.currentUser = action.payload.data;
                // if (data.status === 200) {
                //     usersAdapter.upsertOne(state, data.result);
                // } else {
                //     console.log(data.message);
                // }
            })
    }
});

export const { postUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;