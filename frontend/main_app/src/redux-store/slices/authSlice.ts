import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "redux-store/store";
import Cookies from "js-cookie";


export interface AuthState {
    token?: string;
    refreshToken?: string;
}

const initialState = {
  token: Cookies.get("token"),
  refreshToken: Cookies.get("refreshToken"),
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    removeAuthToken: (state) => {
      state.token = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const saveAuthData = (authData: AuthState) => {
  Cookies.set("token", authData.token || "");
  Cookies.set("refreshToken", authData.refreshToken || "");
  return (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setAuthState(authData));
  };
};

export const authActions = authSlice.actions;
export default authSlice.reducer;
