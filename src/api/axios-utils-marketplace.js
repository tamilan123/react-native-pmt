// services/baseAxios.js
import axios from "axios";
import { getCookies } from "../utils/cookies";
import { removeCookies } from "../utils/cookies";

const baseAxios = axios.create({
  baseURL: process.env.REACT_NATIVE_PUBLIC_PMT_API_URL
});

baseAxios.interceptors.request.use(
  async (config) => {
    const auth_token = await getCookies();
    if (auth_token) {
      config.headers.Authorization = auth_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeCookies();
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
