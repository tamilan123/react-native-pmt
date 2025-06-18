import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { signInApi, userApi } from "../../../utils/api/methods-marketplace";
import { loginRequest, loginSuccess, loginFailure } from "../reducer/userSlice";

export const user_login_thunk = (
  { data = {}, callback = () => {} } = {},
  navigation
) => {
  return async (dispatch) => {
    console.log("Thunk called with data:", data);
    let response = {};
    try {
      dispatch(loginRequest());
      const result = await signInApi(data);

      if (result?.data?.error) {
        Alert.alert("Login Error", result?.data?.error);
      }

      response.status = result?.status;

      if (result?.status === 200) {
        if (result.data.message === "verification required") {
          response.otp = true;
          // You can dispatch(loginWithOTP()) here if needed
        } else if (result.data.message === "Logged in successfully") {
          await AsyncStorage.setItem("auth_token", result.data.token);
          try {
            const user = await userApi(result.data.token);
            dispatch(loginSuccess(user.data));
            navigation.navigate("Home");
          } catch (u_err) {
            if (u_err?.status === 401) {
              response.message = "Invalid credential(s)";
            } else {
              console.log(
                "An unexpected error occurred. Please try again later."
              );
            }
            dispatch(loginFailure(u_err));
          }
        }
      }

      callback(response);
    } catch (err) {
      console.log("An unexpected error occurred. Please try again later.");
      response.status = err?.status;

      if (err?.status === 422) {
        if (err?.data?.message === "email otp locked") {
          response.message =
            "Account locked for security reasons, please try again after 10 mins";
        } else if (err?.data?.message === "OTP has already been sent") {
          response.message = "Redirecting you to OTP screen...";
          response.otp = true;
          // dispatch(loginWithOTP())
        } else {
          response.message = "Invalid credential(s)";
        }
      } else if (err?.status === 406) {
        response.message = "Invalid credential(s)";
        if (err?.data?.message === "login locked") {
          response.message = "login-locked";
        } else {
          response.message = "confirm-email";
        }
      }

      dispatch(loginFailure(err));
      callback(response);
    }
  };
};
