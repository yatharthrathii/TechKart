import { configureStore } from '@reduxjs/toolkit';
import reduxApi from './reduxApi';
import cartSlice from "./cartSlice"
import profileSlice from "./profileSlice"
import authSlice from "./authSlice"

const store = configureStore({
    reducer: {
        api: reduxApi,
        cart: cartSlice,
        profile: profileSlice,
        auth: authSlice,
    },
});

export default store;
