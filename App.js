import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import store from "./src/redux/store.js";
import AppNavigator from "./src/navigation/AppNavigator.js"; 
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StatusBar } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Provider store={store}>
      <PaperProvider
  settings={{
    icon: (props) => <MaterialCommunityIcons {...props} />,
  }}
>

          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </View>
  );
}