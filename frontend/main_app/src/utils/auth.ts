import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import AuthAPI, {AuthTokens} from "services/auth.api";

export interface JwtToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string,
  user_id: string
}

export const getTimeToExpiration = (timestamp: number): number => {
  const remaining = timestamp - Date.now();
  return remaining >= 0 ? remaining : 0;
};

export const setupJwtTokens = async (): Promise<AuthTokens | null> => {
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refreshToken");

  if (token && refreshToken) {
    const decodedRefreshToken = jwtDecode<JwtToken>(refreshToken);
    const decodedToken = jwtDecode<JwtToken>(token);

    const refreshTokenExpiration = decodedRefreshToken.exp * 1000;
    const tokenExpiration = decodedToken.exp * 1000;
    const tokenRefreshDate = Date.now();

    if (refreshTokenExpiration <= tokenRefreshDate) {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      return null;
    }

    if (tokenExpiration <= tokenRefreshDate) {
      const newToken = await AuthAPI.refreshToken(refreshToken);
      return {
        token: newToken,
        refreshToken: refreshToken,
      } as AuthTokens;
    }
    return {token, refreshToken} as AuthTokens;
  }
  return null;
};
