import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { user_login_thunk } from "../../redux/thun";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { passwordLength } from "../../utils/common";

const LoginScreen = () => {
  //   const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  //   const { user } = useSelector((state) => state);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  //   useEffect(() => {
  //     if (user?.login) {
  //       const redirectTo = route?.params?.from || "Home";
  //       navigation.replace(redirectTo);
  //     }
  //   }, [user?.login]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleLogin = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(user_login_thunk({ data: formData }, navigation));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.form}>
          <Text style={styles.title}>Log In</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={!isVisible}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Text style={styles.toggle}>
              {isVisible ? "Hide" : "Show"} Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  form: {
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  toggle: {
    alignSelf: "flex-end",
    color: "blue",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    marginBottom: 5,
    marginLeft: 2
  }
});

export default LoginScreen;
