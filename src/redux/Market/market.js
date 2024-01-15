import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    marketData: null,
    marketPlace: null,
    marketNav: null,
    savedMarket: null
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
        }
    }
});

export const marketState = (state => state.market);

export const {
    setMarketData,
    setMarketPlace,
    setMarketNav,
    setSavedMarket
} = marketRedux.actions;

export default marketRedux.reducer;
