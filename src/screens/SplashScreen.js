import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const coinOpacity = useRef(new Animated.Value(1)).current;
  const pmtOpacity = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const runAnimationAndNavigate = async () => {
      await new Promise((resolve) => {
        Animated.sequence([
          Animated.delay(500),
          Animated.parallel([
            Animated.timing(coinOpacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true
            }),
            Animated.timing(pmtOpacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true
            })
          ]),
          Animated.timing(bgColor, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false
          })
        ]).start(() => {
          resolve();
        });
      });

      try {
        const authToken = await AsyncStorage.getItem("auth_token");
        if (authToken) {
          navigation.replace("explore");
        } else {
          navigation.replace("login");
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
        navigation.replace("login");
      }
    };

    runAnimationAndNavigate();
  }, []);

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["black", "#FFD700"]
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      {/* Coin logo on the left */}
      <Animated.Image
        source={require("../assets/images/footer/Mask_group.png")}
        style={[styles.coinLogo, { opacity: coinOpacity }]}
      />

      {/* PMT logo centered */}
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={[styles.pmtLogo, { opacity: pmtOpacity }]}
      />
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  coinLogo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    left: 115,
    top: "46.5%"
  },
  pmtLogo: {
    width: 170,
    height: 60,
    resizeMode: "contain"
  }
});
