import axios from "axios";
import config from "config.json";
import {storeAuthData} from "redux-store/slices/authSlice";

export interface AuthTokens {
  token: string,
  refreshToken:string;
}

class AuthService {
  BASE_URL = config.BACKEND_URL;

  public async login(email: string, password: string): Promise<AuthTokens> {
    const response = await axios.post(
        `${this.BASE_URL}api/accounts/token/`,
        {email: email, password: password});

    if (response.data.access && response.data.refresh) {
      const authData = {
        token: response.data.access,
        refreshToken: response.data.refresh,
      };
      storeAuthData(authData);
    }
    return {token: response.data.access, refreshToken: response.data.refresh};
  }
}

export default new AuthService();
