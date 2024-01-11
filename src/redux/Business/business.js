import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessData: null,
    businessMainCat: null,
    businessStateAndCity: null,
}

const businessRedux = createSlice({
    name: "business",
    initialState,
    reducers: {
        setBusinessData: (state, actions) => {
            state.businessData = actions.payload;
        },
        setBusinessMainCat: (state, actions) => {
            state.businessMainCat = actions.payload;
        },
        setBusinessStateCity: (state, actions) => {
            state.businessStateAndCity = actions.payload;
        },

    }
});

export const {
    setBusinessData,
    setBusinessMainCat,
    setBusinessStateCity
 } = businessRedux.actions;

export const stateBussinse = (state => state.business);

export default businessRedux.reducer;

