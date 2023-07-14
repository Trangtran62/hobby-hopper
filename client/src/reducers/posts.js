import { createSlice } from '@reduxjs/toolkit';

const apiCalls = createSlice({
    name: 'apiCalls',
    initialState: [],
    reducers: {
        fecthAll(posts, action) {
            
        },
        create(posts, action) {

        }
    }
});

export const { fetchAll, create } = apiCalls.actions;
export default apiCalls.reducer;
