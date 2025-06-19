import * as React from "react";
import * as NavigationBar from "expo-navigation-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
import AppNavigator from "./src/navigation/AppNavgator.js";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000000");
    NavigationBar.setButtonStyleAsync("light");
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Provider store={store}>
        <PaperProvider>
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
