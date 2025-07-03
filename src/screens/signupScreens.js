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
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/Ionicons";
import { user_login_thunk } from "../../src/redux/thunk/user_thunk";
import { useNavigation } from "@react-navigation/native";
import AuthWebIcon from "../../src/assets/images/auth-bg.webp";
import { registerApi } from "../../utils/api/methods-marketplace";
import Toast from "react-native-toast-message";

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

  const handleSubmit = async () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // setLoading(true);
      const response = await registerApi(formData);
      console.log("🚀 ~ handleSubmit ~ response:", response);

      if (response?.result === 200) {
        navigation.navigate("login");
      } else {
        setErrors({ api: response?.message || "Registration failed" });
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: response?.message
        });
      }
    } catch (error) {
      console.log("Registration error:", error);
      Toast.show({
        type: "error",
        text1: "Registration error",
        text2: error
      });
      // setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
              source={AuthWebIcon}
              style={styles.background}
              resizeMode="cover"
            >
              <SafeAreaView style={styles.safeArea}>
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollView}
                  bounces={false}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
                >
                  <View style={styles.signupBox}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("explore")}
                    >
                      <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.logoCenter}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <Text style={styles.title}>Sign Up</Text>

                    <View style={styles.rowContainer}>
                      <View style={styles.halfInputWrapper}>
                        <TextInput
                          placeholder="First Name"
                          value={formData.first_name}
                          onChangeText={(text) =>
                            handleChange("first_name", text)
                          }
                          style={styles.input}
                          placeholderTextColor="#888"
                        />
                        {errors.first_name && (
                          <Text style={styles.error}>{errors.first_name}</Text>
                        )}
                      </View>

                      <View style={styles.halfInputWrapper}>
                        <TextInput
                          placeholder="Last Name"
                          value={formData.last_name}
                          onChangeText={(text) =>
                            handleChange("last_name", text)
                          }
                          style={styles.input}
                          placeholderTextColor="#888"
                        />
                        {errors.last_name && (
                          <Text style={styles.error}>{errors.last_name}</Text>
                        )}
                      </View>
                    </View>

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
                        {errors[key] && (
                          <Text style={styles.error}>{errors[key]}</Text>
                        )}
                      </View>
                    ))}

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
                        onFocus={() => {
                          setTimeout(() => {
                            // This will scroll to the bottom when the last field is focused
                          }, 100);
                        }}
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
                      <Text style={styles.error}>
                        {errors.password_confirmation}
                      </Text>
                    )}

                    <TouchableOpacity
                      style={styles.signupButton}
                      onPress={handleSubmit}
                      disabled={loading}
                    >
                      <Text style={styles.signupText}>
                        {loading ? "Loading..." : "Sign Up"}
                      </Text>
                    </TouchableOpacity>

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
              </SafeAreaView>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000" // Fallback background color matching your image
  },

  keyboardView: {
    flex: 1
  },

  safeArea: {
    flex: 1,
    backgroundColor: "transparent"
  },

  background: {
    flex: 1,
    minHeight: "100%" // Ensures background covers full height
  },

  scrollView: {
    flex: 1,
    backgroundColor: "transparent"
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    paddingBottom: Platform.OS === "ios" ? 200 : 150, // Increased for keyboard space
    minHeight: "100%"
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

  // ✅ Fixed: Changed to row direction for parallel layout
  rowContainer: {
    flexDirection: "row", // Changed from "column" to "row"
    justifyContent: "space-between",
    alignItems: "flex-start", // Changed to flex-start to align error messages properly
    width: "100%",
    gap: 10,
    marginBottom: 12
  },

  halfInputWrapper: {
    flex: 1 // This ensures both inputs take equal width
  },

  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
    color: "#000"
  },

  // Regular full-width input wrapper
  inputWrapper: {
    width: "100%",
    marginBottom: 12
  },

  // Error text below inputs
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
