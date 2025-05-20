import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
// import { registerApi } from "../../api/methods-marketplace";
// import { passwordLength } from "../../utils/common";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SignupComponent = () => {
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isComfirmPasswordVisible, setIsComfirmPasswordVisible] =
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

    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // } else if (formData.password.length < passwordLength) {
    //   newErrors.password = `Password must be at least ${passwordLength} characters long`;
    // }

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

    setLoading(true);
    // try {
    //   const response = await registerApi({
    //     ...formData,
    //     phone: `+91${formData.phone}`
    //   }); // Adjust if you use dynamic country code
    //   Alert.alert("Success", "Registration successful", [
    //     { text: "OK", onPress: () => navigation.navigate("Login") }
    //   ]);
    // } catch (error) {
    //   Alert.alert("Error", error.message || "Registration failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup</Text>

      {[
        "first_name",
        "last_name",
        "phone",
        "email",
        "addressLine1",
        "addressLine2"
      ].map((field) => (
        <View key={field} style={styles.inputWrapper}>
          <TextInput
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData[field]}
            onChangeText={(text) => handleChange(field, text)}
            style={styles.input}
          />
          {errors[field] && <Text style={styles.error}>{errors[field]}</Text>}
        </View>
      ))}

      {/* Password field */}
      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!isVisible}
            style={styles.inputFlex}
          />
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Icon name={isVisible ? "eye" : "eye-off"} size={20} />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>

      {/* Confirm Password field */}
      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChangeText={(text) => handleChange("password_confirmation", text)}
            secureTextEntry={!isComfirmPasswordVisible}
            style={styles.inputFlex}
          />
          <TouchableOpacity
            onPress={() =>
              setIsComfirmPasswordVisible(!isComfirmPasswordVisible)
            }
          >
            <Icon
              name={isComfirmPasswordVisible ? "eye" : "eye-off"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {errors.password_confirmation && (
          <Text style={styles.error}>{errors.password_confirmation}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupComponent;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20
  },
  inputWrapper: {
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 5
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    paddingHorizontal: 10,
    borderRadius: 5
  },
  inputFlex: {
    flex: 1,
    paddingVertical: 10
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  },
  link: {
    marginTop: 20,
    color: "#007AFF",
    textAlign: "center"
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4
  }
});
