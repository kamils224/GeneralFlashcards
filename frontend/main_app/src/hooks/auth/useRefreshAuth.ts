import {useAppDispatch, useAppSelector} from "redux-store/hooks";
import {getTimeToExpiration, JwtToken, setupJwtTokens} from "utils/auth";
import {authActions, saveAuthData} from "redux-store/slices/authSlice";
import {useEffect} from "react";
import jwtDecode from "jwt-decode";


export function useRefreshAuthTokens() {
  const dispatch = useAppDispatch();
  const authTokens = useAppSelector((state) => state.auth);

  const refreshTokens = () => {
    setupJwtTokens().then((tokens) => {
      if (tokens) {
        const authData = {
          token: tokens?.token,
          refreshToken: tokens?.refreshToken,
        };
        dispatch(saveAuthData(authData));
      }
    });
    const currentToken = authTokens.token;
    if (currentToken) {
      const decodedToken = jwtDecode<JwtToken>(currentToken);
      const timeToExpiration = getTimeToExpiration(decodedToken.exp * 1000);
      const logoutTimer = setTimeout(() => {
        dispatch(authActions.removeAuthState());
      }, timeToExpiration);
      return () => {
        clearTimeout(logoutTimer);
      };
    }
  };
  useEffect(refreshTokens, [authTokens]);
  return authTokens;
}
