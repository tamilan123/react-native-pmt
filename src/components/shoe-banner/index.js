import React from "react";
import { View, Image, StyleSheet } from "react-native";

const shoeImage = require("../../../src/assets/images/shoe-image.png");
const shoeBgImage = require("../../../src/assets/images/shoe-background.png");

const ShoeBanner = () => {
  return (
    <View style={styles.section}>
      <View style={styles.innerContainer}>
        <View style={styles.banner}>
          <Image
            source={shoeImage}
            style={styles.shoeImage}
            resizeMode="contain"
          />
          <Image
            source={shoeBgImage}
            style={styles.bgImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 48
  },
  innerContainer: {
    paddingHorizontal: 16
  },
  banner: {
    maxWidth: 1280,
    alignSelf: "center",
    borderRadius: 16,
    position: "relative",
    overflow: "hidden"
  },
  shoeImage: {
    width: "100%",
    height: 200
  },
  bgImage: {
    width: "100%",
    height: 200,
    position: "absolute",
    top: 0,
    left: 0
  }
});

export default ShoeBanner;
