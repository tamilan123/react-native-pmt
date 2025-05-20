import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
import AppNavigator from "./src/navigation/AppNavgator.js";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
