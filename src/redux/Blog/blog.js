import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogData: null,
    savedBlogData: null,
}
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogData: (state, actions) => {
            state.blogData = actions.payload;
        },
        setSavedBlogData: (state, actions) => {
            state.savedBlogData = actions.payload;

        }
    }
});


export const blogState = (state => state.blog);

export const { setBlogData, setSavedBlogData } = blogSlice.actions;

export default blogSlice.reducer;
