import { configureStore, createSlice } from '@reduxjs/toolkit';
const initialState = {
  categoryId: localStorage.getItem('mainCategoryId') ? localStorage.getItem('mainCategoryId') : '',
  subCategoryId: localStorage.getItem('subCategoryId') ? localStorage.getItem('subCategoryId') : '',
  categoryTitle: localStorage.getItem('mainCategoryTitle') ? localStorage.getItem('mainCategoryTitle') : '',
  subCategoryTitle: localStorage.getItem('subCategoryTitle') ? localStorage.getItem('subCategoryTitle') : '',
  isLoading: true
};

const category = createSlice({
  name: 'id',

  initialState,
  reducers: {

    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSubCategoryId: (state, action) => {
      state.subCategoryId = action.payload;
    },
    setCategoryTitle: (state, action) => {
      state.categoryTitle = action.payload;
    },
    setSubCategoryTitle: (state, action) => {
      state.subCategoryTitle = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
});

export const {setLoading, setCategoryId, setSubCategoryId, setCategoryTitle, setSubCategoryTitle } = category.actions;
export const stateCategory = (state=>state.category);

const store = configureStore({
  reducer: {
    category: category.reducer,
  },
});

export default store;
