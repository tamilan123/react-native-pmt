import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const ArtImage = require("../../../src/assets/images/art.png");
const Helmet = require("../../../src/assets/images/helmet.webp");

const { width } = Dimensions.get("window");

const DigitalTreasures = () => {
  return (
    <View style={styles.section}>
      <View style={styles.container}>
        {/* Left side - Image */}
        <View style={styles.left}>
          {/* <Image
            source={ArtImage}
            style={styles.artImage}
            resizeMode="contain"
          /> */}
          <View style={styles.helmetIcon}>
            <Image
              source={Helmet}
              style={styles.helmetImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Right side - Text */}
        <View style={styles.right}>
          <View style={styles.textStrokeContainer}>
            <Text style={styles.bgText}>Unique Digital</Text>
            <Text style={styles.bgText}>Unique Digital</Text>
          </View>
          <Text style={styles.heading}>
            Unique{"\n"}Digital{"\n"}
            <Text style={styles.highlight}>Treasures</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flexDirection: width > 768 ? "row" : "column"
  },
  left: {
    width: width > 768 ? "50%" : "100%",
    padding: 16,
    paddingTop: 48,
    position: "relative",
    alignItems: "center"
  },
  artImage: {
    width: "100%",
    maxWidth: 300,
    height: undefined,
    aspectRatio: 1
  },
  helmetIcon: {
    position: "absolute",
    bottom: 0,
    right: 24,
    width: 100
  },
  helmetImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1
  },
  right: {
    width: width > 768 ? "50%" : "100%",
    backgroundColor: "#000",
    padding: 24,
    justifyContent: "center"
  },
  textStrokeContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 0
  },
  bgText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "transparent",
    textShadowColor: "#333",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  heading: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "700",
    zIndex: 1
  },
  highlight: {
    color: "#ffd700"
  }
});

export default DigitalTreasures;
