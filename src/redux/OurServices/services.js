import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    servicesData: null,
    categoryDataServ: null,
    categoryDataShop: null,
    categpryDataAll: null
};

const servicesReducer = createSlice({
    name: "services",
    initialState,
    reducers: {
        setServicesData: (state, actions) => {
            state.servicesData = actions.payload;
        },
        setCategServers: (state, actions) => { 
            state.categoryDataServ = actions.payload;
        },
        setCategShop:(state, actions)=>{
            state.categoryDataShop = actions.payload;
        },
        setCateDataAll:(state, actions)=>{
            state.categpryDataAll = actions.payload
        }

    }
});

export const {
     setServicesData,
     setCateDataAll,
     setCategServers,
     setCategShop
     } = servicesReducer.actions;

export const serversState = (state => state);

export default servicesReducer.reducer;