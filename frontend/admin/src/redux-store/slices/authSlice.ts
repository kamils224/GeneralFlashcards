import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from 'redux-store/store';

interface AuthState {
    token: string | null;
}

const initialState = {
  token: null,
} as AuthState;
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeAuthToken: (state) => {
      state.token = null;
    },
  },
});

export const {setAuthToken, removeAuthToken} = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const isAuthenticated = (state: RootState) => !!state.auth.token;

export default authSlice.reducer;
