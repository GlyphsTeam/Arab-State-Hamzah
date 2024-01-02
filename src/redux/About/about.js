import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    aboutData: null
}


const aboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {
        setAboutData: (state, actions) => {
            state.aboutData = actions.payload;
        }
    }
});

export const aboutState = (state => state.about);
export const { setAboutData } = aboutSlice.actions;

export default aboutSlice.reducer