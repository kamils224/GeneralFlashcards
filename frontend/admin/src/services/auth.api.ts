import axios from "axios";
import config from "config.json";

export interface LoginPayload {
  email: string,
  password: string
}

export interface AuthTokens {
  token: string,
  refreshToken:string;
}

const BASE_URL = config.BACKEND_URL;

export const getAuthTokens = async (payload: LoginPayload): Promise<AuthTokens> => {
  const response = await axios.post(
      `${BASE_URL}api/accounts/token/`,
      {email: payload.email, password: payload.password});
  return {token: response.data.access, refreshToken: response.data.refresh};
};

