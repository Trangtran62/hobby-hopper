import {
    createSlice, 
    createEntityAdapter
} from '@reduxjs/toolkit';

const idsAdapter = createEntityAdapter()

const initialState = idsAdapter.getInitialState();

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
    }});

export const { postUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;