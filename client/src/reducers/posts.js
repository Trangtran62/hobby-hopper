import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
    name: 'apiCalls',
    initialState: [],
    reducers: {
        postAdded(state, action) {
            return state;
        },
        postCreated(state, action) {
            return state;
        }
    }
});

export const { postAdded, postCreated } = postsSlice.actions;
export default postsSlice.reducer;
