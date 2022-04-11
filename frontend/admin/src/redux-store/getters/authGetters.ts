import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "redux-store/store";
import {AuthState} from "redux-store/slices/authSlice";

export const getIsAuthenticated = createSelector(
    (state: RootState) => state.auth,
    (auth: AuthState) => !!auth.token,
);
