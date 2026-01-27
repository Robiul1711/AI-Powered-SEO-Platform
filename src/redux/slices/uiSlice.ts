import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resetToken: null,
  apiError: null,
  user: null,
  
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setApiError: (state, action) => {
      state.apiError = action.payload;
    },
    clearUiState: (state) => {
      state.resetToken = null;
      state.apiError = null;
    },
  },
});

export const { setResetToken, setApiError, clearUiState, setUser } = uiSlice.actions;

export default uiSlice.reducer;
