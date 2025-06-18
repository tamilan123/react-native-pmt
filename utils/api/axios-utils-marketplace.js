import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCookies, removeCookies } from "../../utils/cookies";
import { REACT_NATIVE_PUBLIC_PMT_API_URL } from "@env"; // make sure .env and babel config are set

const baseAxios = axios.create({
  baseURL: REACT_NATIVE_PUBLIC_PMT_API_URL
});

baseAxios.interceptors.request.use(
  async function (config) {
    try {
      const auth_token = await getCookies();
      if (auth_token) {
        config.headers.Authorization = `Bearer ${auth_token}`;
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("Unauthorized. Clearing tokens.");
      await removeCookies();
      await AsyncStorage.clear();

      // Optional redirect
      if (global.navigationRef?.current) {
        global.navigationRef.current.reset({
          index: 0,
          routes: [{ name: "Login" }] // Adjust based on your screen
        });
      }
    }

    console.error("Response error:", status || error.message);
    return Promise.reject(error);
  }
);

export default baseAxios;
