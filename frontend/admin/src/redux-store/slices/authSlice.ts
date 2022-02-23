import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "redux-store/store";
import Cookies from "js-cookie";


export interface AuthState {
    token: string | null;
    refreshToken: string | null;
}

const initialState = {
  token: Cookies.get("token") || null,
  refreshToken: Cookies.get("refreshToken") || null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    removeAuthToken: (state) => {
      state.token = null;
    },
  },
});

export const storeAuthData = (authData: AuthState) => {
  if (authData.token && authData.refreshToken) {
    Cookies.set("token", authData.token);
    Cookies.set("refreshToken", authData.refreshToken);
  }

  return (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setAuthToken(authData));
  };
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
