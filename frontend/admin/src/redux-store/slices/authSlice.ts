import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "redux-store/store";
import {AuthTokens} from "api/auth";


interface AuthState {
    token: string | null;
    refreshToken: string | null;
}

const initialState = {
  token: null,
} as AuthState;
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthTokens>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    removeAuthToken: (state) => {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const isAuthenticated = (state: RootState) => !!state.auth.token;

export default authSlice.reducer;
