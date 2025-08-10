import { createSlice } from '@reduxjs/toolkit';

const getCartFromStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart || { cartItems: [], cartCount: 0, cartSubTotal: 0 };
};

const initialState = getCartFromStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(p => p.id === item.id);

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cartItems.push({ ...item });
            }

            cartSlice.caseReducers.calculateTotals(state);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            cartSlice.caseReducers.calculateTotals(state);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find(item => item.id === id);
            if (item && quantity >= 1) item.quantity = quantity;
            cartSlice.caseReducers.calculateTotals(state);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.cartCount = 0;
            state.cartSubTotal = 0;
            localStorage.removeItem("cart");
        },

        calculateTotals: (state) => {
            state.cartCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
            state.cartSubTotal = state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
