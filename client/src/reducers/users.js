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
        },
        signin(state, action) {

        },
        signup(state, action) {

        }
    }});

export const { postUser, clearUser, signin, signup } = usersSlice.actions;
export default usersSlice.reducer;