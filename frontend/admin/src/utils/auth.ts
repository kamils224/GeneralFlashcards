import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import AuthAPI, {AuthTokens} from "services/auth.api";

const TIME_TO_REFRESH_TOKEN = 60000 * 10; // 5 minutes

interface JwtToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string,
  user_id: string
}


export const setupJwtTokens = async (): Promise<AuthTokens | null> => {
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refreshToken");

  if (token && refreshToken) {
    const decodedToken = jwtDecode<JwtToken>(token);
    const tokenExpiration = new Date(decodedToken.exp * 1000);
    const tokenRefreshDate = new Date(Date.now() - TIME_TO_REFRESH_TOKEN);

    if (tokenExpiration <= tokenRefreshDate) {
      const decodedRefreshToken = jwtDecode<JwtToken>(refreshToken);
      const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000);

      if (refreshTokenExpiration > tokenRefreshDate) {
        const newTokens = await AuthAPI.refreshToken(refreshToken);
        return {
          token: newTokens?.token,
          refreshToken: newTokens?.refreshToken,
        } as AuthTokens;
      }
    }
  }
  return null;
};
