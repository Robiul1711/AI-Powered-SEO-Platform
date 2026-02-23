import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string | number;
  full_name?: string;
  name?: string;
  email?: string;
  profile_image?: string;
  [key: string]: any;
}

interface UiState {
  resetToken: string | null;
  apiError: any;
  user: User | null;
}

const initialState: UiState = {
  resetToken: null,
  apiError: null,
  user: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setResetToken: (state, action: PayloadAction<string | null>) => {
      state.resetToken = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      // In fetchUserProfile.ts, dispatch(setUser(query.data))
      // query.data is res.data.userdata || res.data
      // In uiSlice.ts originally it was const { user } = action.payload;
      // Let's make it flexible.
      if (action.payload?.user) {
        state.user = action.payload.user;
      } else {
        state.user = action.payload;
      }
    },
    setApiError: (state, action: PayloadAction<any>) => {
      state.apiError = action.payload;
    },
    clearUiState: (state) => {
      state.resetToken = null;
      state.apiError = null;
    },
  },
});

export const { setResetToken, setApiError, clearUiState, setUser } =
  uiSlice.actions;

export default uiSlice.reducer;

export const selectCurrentUser = (state: any) => state.ui.user;
