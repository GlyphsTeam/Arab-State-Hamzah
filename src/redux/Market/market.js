import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    marketData: null,
    marketPlace: null,
    marketNav: null,
    savedMarket: null,
    postedMarket: null,
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
        },
        setSavedMarket: (state, actions) => {
            state.savedMarket = actions.payload;
        },
        setPostedMarket: (state, actions) => { 
            state.postedMarket = actions.payload;
        }
    }
});

export const marketState = (state => state.market);

export const {
    setMarketData,
    setMarketPlace,
    setMarketNav,
    setSavedMarket,
    setPostedMarket
} = marketRedux.actions;

export default marketRedux.reducer;
