import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "redux-store/store";

export const isAuthenticated = createSelector(
    (state: RootState) => state,
    (state: RootState) => !!state.auth.token,
);
