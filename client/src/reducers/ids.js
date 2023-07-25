import {
    createSlice, 
    createEntityAdapter
} from '@reduxjs/toolkit';

const idsAdapter = createEntityAdapter()

const initialState = idsAdapter.getInitialState();

const idsSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
        postCurrentId(state, action) {
            state.currentId = action.payload;
        },
        clearCurrentId(state, action) {
            state.currentId = undefined;
        }
    }});

export const { postCurrentId, clearCurrentId } = idsSlice.actions;
export default idsSlice.reducer;