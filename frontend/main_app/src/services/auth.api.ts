import axios from "axiosInstance";
import {LoginError} from "services/errors.api";


export interface LoginPayload {
  email: string,
  password: string
}

export interface AuthTokens {
  token: string,
  refreshToken:string;
}

class AuthAPI {
  async getAuthTokens(payload: LoginPayload): Promise<AuthTokens> {
    try {
      const response = await axios.post(
          "api/accounts/token/",
          {email: payload.email, password: payload.password});
      return {token: response.data.access, refreshToken: response.data.refresh};
    } catch {
      throw new LoginError();
    }
  }
  async refreshToken(refresh: string): Promise<AuthTokens> {
    const response = await axios.post(
        "api/accounts/token/refresh/",
        {refresh: refresh});
    return {token: response.data.access, refreshToken: response.data.refresh};
  }
}

export default new AuthAPI();

