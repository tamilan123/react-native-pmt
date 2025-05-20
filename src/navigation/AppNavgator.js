import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupComponent from "../screens/signupScreens";
import LoginScreen from "../screens/loginScreen";
import HomeScreen from "../screens/homeScreen";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="signUp"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="signUp" component={SignupComponent} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
