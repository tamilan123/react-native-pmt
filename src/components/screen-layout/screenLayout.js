// components/ScreenLayout.js
import { View, Dimensions } from "react-native";
import Header from "../layout-component/header";

const ScreenLayout = ({ children }) => {
  const isMobile = Dimensions.get("window").width < 768;

  return (
    <View style={{ flex: 1 }}>
      {isMobile && <Header />}
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

export default ScreenLayout;
