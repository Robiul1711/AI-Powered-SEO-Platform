import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = !!token;
    },
    clearAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: any) => state.auth.token;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
