import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    homeData:null
}

const homeReducer = createSlice({
    name: "home",
    initialState,
    reducers: {
     setHomeData:(state, actions) => { 
        state.homeData = actions.payload
     }
    }
});


export const { setHomeData } = homeReducer.actions;

export const homeState = (state => state.home);


export default homeReducer.reducer;