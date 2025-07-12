import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
const AuthBgIcon = require ("../../src/assets/images/auth-bg.png");
import { signInApi, userApi } from "../../utils/api/methods-marketplace";
import { setItem, setUserInfo } from "../../utils/storage/AsyncStorageService";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { user_login_thunk } from "../redux/actions";

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const [formData, setFormData] = useState({ email: "", password: "" });
  console.log("🚀 ~ LoginScreen ~ formData:", formData);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (name, value) => {
    console.log("🚀 ~ handleChange ~ value:", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const passwordLength = 6;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < passwordLength) {
      newErrors.password = `Password must be at least ${passwordLength} characters long`;
    }

    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await signInApi(formData);
        console.log("🚀 ~ handleLogin ~ response:", response);

        const token = response?.data?.token;
        console.log("🚀 ~ handleLogin ~ token:", token);
        if (token) {
          await AsyncStorage.setItem("auth_token", token);
          const userDetails = await userApi(token);
          console.log("🚀 ~ handleLogin ~ userDetails:", userDetails?.data);
          if (userDetails) {
            await setUserInfo(userDetails.data);
          }

          navigation.replace("explore");
        } else {
          const message = response?.data?.error || "Login failed";
          setErrors({ api: message });
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: message
          });
        }
      } catch (error) {
        console.error("❌ API error", error);
        setErrors({ api: "Something went wrong. Please try again." });
        Toast.show({
          type: "error",
          text1: "Server Error",
          text2: "Something went wrong. Please try again."
        });
      }
    }
  };

  const handleNavigate = () => {
    navigation.navigate("explore");
  };

  return (
    <ImageBackground
      source={AuthBgIcon}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.logoBackground}>
        <TouchableOpacity onPress={handleNavigate}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logoTop}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.loginBoxContainer}>
        <View style={styles.loginBox}>
          <TouchableOpacity onPress={handleNavigate}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logoCenter}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.title}>Log In</Text>

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#888"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry={!isVisible}
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
            />
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={styles.eyeIcon}
            >
              <Icon
                name={isVisible ? "eye" : "eye-off"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          {errors.api && <Text style={styles.errorText}>{errors.api}</Text>}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate("signUp")}
            >
              SignUp
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: "#000"
  },
  eyeIcon: {
    paddingLeft: 8
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginBoxContainer: {
    width: "90%"
  },
  logoBackground: {
    position: "absolute",
    top: 40,
    left: 20
  },
  logoTop: {
    width: 60,
    height: 60
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 4,
    fontSize: 12
  },
  loginBox: {
    backgroundColor: "white",
    width: "100%",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5
  },
  logoCenter: {
    width: 100,
    height: 40,
    marginBottom: 12
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16
  },
  loginButton: {
    backgroundColor: "#f2c400",
    width: "100%",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12
  },
  loginText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },
  signupText: {
    color: "#444"
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold"
  }
});
