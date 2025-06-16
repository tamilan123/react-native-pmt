import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupComponent from "../screens/signupScreens";
import LoginScreen from "../screens/loginScreen";
import HomeScreen from "../screens/homeScreen";
import NftDetailsScreen from "../components/nft-details";
import ExploreScreen from "../components/explore-screen";
import DAOVotingPage from "../components/dao-voting";
import StakingScreen from "../components/staking";
import TokenSwapScreen from "../components/token-swap";
import NFTProfilePage from "../components/profile-screen";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="explore"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signUp" component={SignupComponent} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="item-details" component={NftDetailsScreen} />
      <Stack.Screen name="explore" component={ExploreScreen} />
      <Stack.Screen name="dao" component={DAOVotingPage} />
      <Stack.Screen name="staking" component={StakingScreen} />
      <Stack.Screen name="swap" component={TokenSwapScreen} />
      <Stack.Screen name="profile" component={NFTProfilePage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
