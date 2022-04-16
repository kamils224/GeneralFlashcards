import {useAppDispatch, useAppSelector} from "redux-store/hooks";
import {selectIsAuthenticated} from "redux-store/selectors/authSelectors";
import {setupJwtTokens} from "utils/auth";
import {authActions, saveAuthData} from "redux-store/slices/authSlice";
import {useEffect} from "react";
import axios from "axiosInstance";


export function useRefreshAuthTokens() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const refreshTokens = () => {
    setupJwtTokens().then((tokens) => {
      if (tokens) {
        const authData = {
          token: tokens?.token,
          refreshToken: tokens?.refreshToken,
        };
        dispatch(saveAuthData(authData));
        axios.defaults.headers.common["Authorization"] = `Bearer ${authData.token}`;
      }
    });
    // todo: start logout timer here
    if (isLoggedIn) {
      console.log("Log out in 5 seconds");
      const logoutTimer = setTimeout(() => {
        console.log("Log out");
        dispatch(authActions.removeAuthToken());
      }, 5000);
      return () => {
        console.log("Clear timer");
        clearTimeout(logoutTimer);
      };
    }
  };
  useEffect(refreshTokens, [isLoggedIn]);
  return isLoggedIn;
}
