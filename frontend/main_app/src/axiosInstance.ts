import axios, {AxiosRequestConfig} from "axios";
import config from "config.json";
import store from "redux-store/store";

const BASE_URL = config.BACKEND_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "",
  },
});

instance.interceptors.request.use(
    function(config: AxiosRequestConfig) {
      const token = store.getState().auth.token;
      if (token && config.headers) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
);

export default instance;
