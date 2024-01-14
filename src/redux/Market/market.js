import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    marketData: null,
    marketPlace: null,
    marketNav: null
};

const marketRedux = createSlice({
    name: "market",
    initialState,
    reducers: {
        setMarketData: (state, actions) => {
            state.marketData = actions.payload;
        },
        setMarketPlace: (state, actions) => {
            state.marketPlace = actions.payload;
        },
        setMarketNav: (state, actions) => {
            state.marketNav = actions.payload;
        }
    }
});

export const marketState = (state => state.market);

export const {
    setMarketData,
    setMarketPlace,
    setMarketNav
} = marketRedux.actions;

export default marketRedux.reducer;
