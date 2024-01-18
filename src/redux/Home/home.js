import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    homeData: null,
    userGuidData: null
}

const homeReducer = createSlice({
    name: "home",
    initialState,
    reducers: {
        setHomeData: (state, actions) => {
            state.homeData = actions.payload
        },
        setUserGuidData: (state, actions) => {
            state.userGuidData = actions;
        }
    }
});


export const { setHomeData, setUserGuidData } = homeReducer.actions;

export const homeState = (state => state.home);


export default homeReducer.reducer;