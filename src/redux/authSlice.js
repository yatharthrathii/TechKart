import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  idToken: null,
  userId: null,
  authLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, idToken, userId } = action.payload;
      state.user = user;
      state.idToken = idToken;
      state.userId = userId;
      state.authLoaded = true;
      localStorage.setItem("auth", JSON.stringify({ user, idToken, userId }));
    },
    logout: (state) => {
      state.user = null;
      state.idToken = null;
      state.userId = null;
      state.authLoaded = true;
      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
    },
    loadAuthFromStorage: (state) => {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (authData?.idToken) {
        state.user = authData.user;
        state.idToken = authData.idToken;
        state.userId = authData.userId;
      }
      state.authLoaded = true;
    },
  },
});


export const { loginSuccess, logout, loadAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
