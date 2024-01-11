import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rentData: null,
    jobData: null
};

const rentRedux = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setRentData: (state, actions) => {
            state.rentData = actions.payload;
        },
        setJobData: (state, actions) => {
            state.jobData = actions.payload;
        }
    }
});


export const rentState = (state => state.rent);

export const { setRentData, setJobData } = rentRedux.actions;

export default rentRedux.reducer;