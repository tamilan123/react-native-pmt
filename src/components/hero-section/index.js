// components/HeroSection.js

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeroSection = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Marketplace");
  };

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <Text style={styles.heading}>
            <Text style={styles.highlight}>Discover Digital{"\n"}</Text>
            Arts and Collection
          </Text>
          <Text style={styles.subHeading}>NFTs</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Sit faucibus nunc aliquet
            purus id nibh. Ultrices varius quis sit volutpat ipsum.
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightSide}>
          <Image
            source={require("../../../src/assets/images/gift-box.webp")}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={handleNavigate}
            style={styles.exploreButton}
          >
            <Text style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: "#fff"
  },
  container: {
    flexDirection: "column",
    gap: 20
  },
  leftSide: {
    marginBottom: 20
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    color: "#000"
  },
  highlight: {
    color: "#000"
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16
  },
  buyButton: {
    backgroundColor: "#FFE501",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start"
  },
  buyButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16
  },
  rightSide: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 12
  },
  exploreButton: {
    backgroundColor: "#000",
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  exploreButtonText: {
    color: "#FFE501",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase"
  }
});

export default HeroSection;
