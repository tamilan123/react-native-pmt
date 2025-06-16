// components/HeroSection.js

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HeroSection = () => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Marketplace");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <View style={styles.container}>
            <View style={styles.leftSide}>
              <Text style={styles.heading}>
                <Text style={styles.highlight}>Discover Digital{"\n"}</Text>
                Arts and Collection
              </Text>
              <Text style={styles.subHeading}>NFTs</Text>
              <Text style={styles.description}>
                Public Masterpiece is the first of its kind, a unique and
                innovative collective that builds bridges between physical art
                and blockchain. It shines new light on authenticity by tracking
                each artwork with digital certificates from inception to sale.
                The uniqueness continues as it offers fair trade for both artist
                and collector alike while also providing creative investment
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: "#fff"
  },
  scrollContainer: {
    paddingBottom: 24
  },

  container: {
    flexDirection: "column",
    justifyContent: "space-between"
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
