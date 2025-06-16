import React from "react";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import Footer from "../footer";
import PMTLogo from "../../assets/images/logo.png";

const ScreenLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image
              source={PMTLogo}
              style={{ width: 50, height: 24, resizeMode: "contain" }}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>{children}</View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#FFE500"
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    // backgroundColor: "#000000",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  content: {
    flex: 1,
    paddingBottom: 60
  }
});

export default ScreenLayout;
