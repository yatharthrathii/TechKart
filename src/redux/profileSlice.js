import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addresses: [],
    selectedAddress: null,
    userProfile: {
        name: "",
        phone: ""
    },
    userOrders: [],
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserOrders: (state, action) => {
            state.userOrders = action.payload;
        },
        setAddresses: (state, action) => {
            state.addresses = action.payload;
        },
        addAddressLocal: (state, action) => {
            state.addresses.push(action.payload);
        },
        updateAddressLocal: (state, action) => {
            state.addresses = state.addresses.map(addr =>
                addr.id === action.payload.id ? action.payload : addr
            );
        },
        deleteAddressLocal: (state, action) => {
            state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
            if (state.selectedAddress?.id === action.payload) {
                state.selectedAddress = null;
            }
        },
        selectAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        setAllAddresses: (state, action) => {
            state.addresses = action.payload;
            state.selectedAddress = null;
            localStorage.setItem("profile", JSON.stringify(state));
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        clearProfile: () => initialState
    },
});

export const {
    setAddresses,
    addAddressLocal,
    updateAddressLocal,
    deleteAddressLocal,
    selectAddress,
    clearProfile,
    setAllAddresses,
    setUserProfile,
    setUserOrders
} = profileSlice.actions;

export default profileSlice.reducer;
