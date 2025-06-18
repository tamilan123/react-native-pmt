// src/storage/AsyncStorageService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRegisterId = async () => {
  try {
    const registerId = await AsyncStorage.getItem("registerId");
    return registerId;
  } catch (error) {
    console.error("Error retrieving worker ID:", error);
    return null;
  }
};

export const setRegisterId = async (registerId) => {
  try {
    await AsyncStorage.setItem("registerId", registerId);
  } catch (error) {
    console.error("Error saving worker ID:", error);
  }
};

export const getPrivatekey = async () => {
  try {
    const registerId = await AsyncStorage.getItem("privateKey");
    return registerId;
  } catch (error) {
    console.error("Error  privateKey:", error);
    return null;
  }
};

export const setPrivatekey = async (privateKey) => {
  try {
    await AsyncStorage.setItem("privateKey", privateKey);
  } catch (error) {
    console.error("Error saving privateKey:", error);
  }
};

export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo;
  } catch (error) {
    console.error("Error retrieving userInfo:", error);
    return null;
  }
};

export const setUserInfo = async (userInfoObj) => {
  try {
    await AsyncStorage.setItem("userInfo", userInfoObj);
  } catch (error) {
    console.error("Error saving userInfo:", error);
  }
};

export const setClaimDateTime = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`${key} local saved:`, value);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const setItem = async (key, value) => {
  console.log("🚀 ~ setItem ~ value:", value);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error fetching data from AsyncStorage:", error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data from AsyncStorage:", error);
  }
};

export const clearAll = async () => {
  try {
    console.log("Device successfully clearAll storage");
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
