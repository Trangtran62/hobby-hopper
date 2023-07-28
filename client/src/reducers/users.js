import {
    createSlice, 
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import * as api from '../api';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const signin = createAsyncThunk('users/signin', async (params, { rejectWithValue }) => {  
    try {
        const response = await api.signIn(params.form);
        const nav = params.nav;
        nav('/');
        return response.data;
    } catch (error) {
        return rejectWithValue("Invalid credentials");
    }
});

export const signup = createAsyncThunk('users/signup', async (params, { rejectWithValue }) => {
    try {
        const response = await api.signUp(params.form);
        const nav = params.nav;
        nav('/');
        return response.data;
    } catch (error) {
        return rejectWithValue("Invalid credentials or account may already exist");
    }
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
                state.currentUser = action.payload;
            })
            .addCase(signin.rejected, (state, action) => {
                console.log(action.payload);
                return action.payload;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                return action.payload;
            })
    }
});

export const { postUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;