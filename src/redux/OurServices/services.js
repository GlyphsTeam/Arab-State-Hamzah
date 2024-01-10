import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    servicesData: null
};

const servicesReducer = createSlice({
    name: "services",
    initialState,
    reducers: {
        setServicesData: (state, actions) => {
            state.servicesData = actions.payload;
        }
    }
});

export const { setServicesData } = servicesReducer.actions;

export const serversState = (state => state);

export default servicesReducer.reducer;