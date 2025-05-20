import axios from "axios";
import { getCookies, removeCookies } from "../utils/cookies";
const baseURL = process.env.REACT_NATIVE_PUBLIC_PMT_API_URL;

const baseAxios = axios.create({
  baseURL
});

baseAxios.interceptors.request.use(
  async function (config) {
    const auth_token = await getCookies();
    if (auth_token) {
      config.headers.Authorization = auth_token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      await removeCookies();
    }
    return Promise.reject(error);
  }
);

export default baseAxios;
