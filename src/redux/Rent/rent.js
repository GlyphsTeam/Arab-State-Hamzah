import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rentData: null,
    jobData: null,
    savedDataRent: null,
    savedDataJob: null,
    postedRent:null,
    postedJob:null,
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
        },
        setSavedDataProfile: (state, actions) => {
            state.savedDataRent = actions.payload;
        },
        setSavedJobData: (state, actions) => { 
            state.savedDataJob = actions.payload;
        },
        setPostedRent:(state, actions) => {
            state.postedRent = actions.payload;
        },
        setPostedJob:(state, actions) => {
            state.postedJob = actions.payload;
        }
    }
});


export const rentState = (state => state.rent);

export const { 
    setRentData, 
    setJobData, 
    setSavedDataProfile, 
    setSavedJobData,
    setPostedRent,
    setPostedJob } = rentRedux.actions;

export default rentRedux.reducer;