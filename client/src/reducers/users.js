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
            state.entities = action.payload;
        },
        clearUser(state, action) {
            state.entities = undefined;
        }
    }});

export const { postUser, clearUser } = usersSlice.actions;
export default usersSlice.reducer;