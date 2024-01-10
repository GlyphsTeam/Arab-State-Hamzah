import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contactData: null
};

const contactRedux = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContactData: (state, actions) => {
            state.contactData = actions.payload;
        }
    }
});


export const contactState = (state => state.contact);

export const { setContactData } = contactRedux.actions;

export default contactRedux.reducer;