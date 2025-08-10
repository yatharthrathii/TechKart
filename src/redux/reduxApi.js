import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    products: [],
};

const reduxApi = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload
        }
    },
});

export const { setCategories , setProducts } = reduxApi.actions;
export default reduxApi.reducer;
