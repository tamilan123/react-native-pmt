import AsyncStorage from "@react-native-async-storage/async-storage";

const cookie_token = "pmt_base_user_token";
const source_token = "source";

export const setCookiesByName = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

export const setCookies = async (value) => {
  try {
    await AsyncStorage.setItem(cookie_token, value);
  } catch (error) {
    console.error("Error setting main token:", error);
  }
};

export const getCookies = async () => {
  try {
    return await AsyncStorage.getItem(cookie_token);
  } catch (error) {
    console.error("Error getting main token:", error);
    return null;
  }
};

export const getSourceCookies = async () => {
  try {
    return await AsyncStorage.getItem(source_token);
  } catch (error) {
    console.error("Error getting source cookie:", error);
    return null;
  }
};

export const removeCookies = async () => {
  try {
    await AsyncStorage.removeItem(cookie_token);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
