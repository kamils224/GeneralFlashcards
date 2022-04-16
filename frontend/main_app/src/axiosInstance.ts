import axios from "axios";
import config from "config.json";

const BASE_URL = config.BACKEND_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export default instance;
