import axios from "axios";
import config from "config.json";


export interface AuthTokens {
  token: string;
  refreshToken: string;
}

class AuthService {
  BASE_URL = config.BACKEND_URL;

  public async login(email: string, password: string): Promise<AuthTokens> {
    const response = await axios.post(
        `${this.BASE_URL}api/accounts/token/`,
        {email: email, password: password});

    return {token: response.data.access, refreshToken: response.data.refresh};
  }
}

const authService = new AuthService();
export default authService;
