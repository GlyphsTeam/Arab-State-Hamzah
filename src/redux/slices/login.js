import { configureStore, createSlice } from '@reduxjs/toolkit';
import home from '../Home/home'
import about from '../About/about';
import services from '../OurServices/services';
import blog from '../Blog/blog';
import contact from '../ContactUs/contact';
 const initialState = {
  username: localStorage.getItem("arab_user_name")
  ?  localStorage.getItem("arab_user_name") 
  : 'Guest',
  newField: null, 
  isLoading: true

};

 const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setNewField: (state, action) => {
      state.newField = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
});

 export const {setLoading, setUsername,setNewField } = userSlice.actions;
 export const stateCategory = (state=>state.user);

 const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    home:home,
    about:about,
    services:services,
    blog:blog,
    contact:contact
  },
  setNewField: (state, action) => {
    state.newField = action.payload;
    
  },
});

export default store;
