import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  SafeAreaView,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { user_login_thunk } from "../../src/redux/thunk/user_thunk";
import { useNavigation } from "@react-navigation/native";

const PASSWORD_MIN_LENGTH = 6;

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  console.log("🚀 ~ SignUpScreen ~ formData:", formData);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!formData.addressLine2)
      newErrors.addressLine2 = "Address Line 2 is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`;
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(user_login_thunk({ data: formData }, navigate));
    }
    // Simulate API call
    setTimeout(() => {
      Alert.alert("Success", "Registration successful", [
        { text: "OK", onPress: () => navigation.navigate("Login") }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../src/assets/images/auth-bg.webp")}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.signupBox}>
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logoCenter}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.rowContainer}>
              {[
                { key: "first_name", placeholder: "First Name" },
                { key: "last_name", placeholder: "Last Name" }
              ].map(({ key, placeholder }) => (
                <View key={key} style={styles.halfInputWrapper}>
                  <TextInput
                    placeholder={placeholder}
                    value={formData[key]}
                    onChangeText={(text) => handleChange(key, text)}
                    style={styles.input}
                    placeholderTextColor="#888"
                  />
                  {errors[key] && (
                    <Text style={styles.error}>{errors[key]}</Text>
                  )}
                </View>
              ))}
            </View>

            {/* Remaining Fields */}
            {[
              {
                key: "phone",
                placeholder: "Phone Number",
                keyboardType: "numeric"
              },
              { key: "email", placeholder: "Email" },
              { key: "addressLine1", placeholder: "Address Line 1" },
              { key: "addressLine2", placeholder: "Address Line 2" }
            ].map(({ key, placeholder, keyboardType }) => (
              <View key={key} style={styles.inputWrapper}>
                <TextInput
                  placeholder={placeholder}
                  value={formData[key]}
                  onChangeText={(text) => handleChange(key, text)}
                  style={styles.input}
                  placeholderTextColor="#888"
                  keyboardType={keyboardType}
                />
                {errors[key] && <Text style={styles.error}>{errors[key]}</Text>}
              </View>
            ))}

            {/* Password Field */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={!isVisible}
                style={styles.passwordInput}
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
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Confirm Password Field */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry={!isConfirmPasswordVisible}
                style={styles.passwordInput}
                value={formData.password_confirmation}
                onChangeText={(text) =>
                  handleChange("password_confirmation", text)
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                style={styles.eyeIcon}
              >
                <Icon
                  name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            {errors.password_confirmation && (
              <Text style={styles.error}>{errors.password_confirmation}</Text>
            )}

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.signupText}>
                {loading ? "Loading..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Login Text */}
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate("login")}
              >
                Log In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 40
  },

  signupBox: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 30,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 10
      }
    })
  },

  logoCenter: {
    width: 120,
    height: 60,
    marginBottom: 12,
    alignSelf: "center"
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#333",
    marginBottom: 24
  },

  rowContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginBottom: 12
  },

  halfInputWrapper: {
    flex: 1
  },

  input: {
    width: "100%", // Keep this
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
    color: "#000"
  },

  // 👇🏽 Regular full-width input wrapper
  inputWrapper: {
    width: "100%",
    marginBottom: 12
  },

  // 👇🏽 Error text below inputs
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 4,
    fontSize: 12
  },

  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9"
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: "#000"
  },

  eyeIcon: {
    paddingLeft: 8
  },

  signupButton: {
    backgroundColor: "#ffd700",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 3
      }
    })
  },

  signupText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },

  loginText: {
    color: "#444",
    marginTop: 16
  },

  loginLink: {
    color: "#007bff",
    fontWeight: "bold"
  }
});
