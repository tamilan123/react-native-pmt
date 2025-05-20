import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");

const NftCardLoader = () => {
  return (
    <View style={styles.cardContainer}>
      <SkeletonPlaceholder borderRadius={12}>
        <View style={styles.image} />

        <View style={styles.infoContainer}>
          <View style={styles.title} />
          <View style={styles.row}>
            <View style={styles.smallBar1} />
            <View style={styles.smallBar2} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 400,
    width: width * 0.9,
    borderWidth: 6,
    borderColor: "black",
    borderRadius: 16,
    backgroundColor: "black",
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20
  },
  image: {
    height: "65%",
    width: "100%"
  },
  infoContainer: {
    marginTop: "auto",
    padding: 16,
    backgroundColor: "black"
  },
  title: {
    height: 24,
    width: "100%",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  smallBar1: {
    width: 100,
    height: 12
  },
  smallBar2: {
    width: 60,
    height: 10
  }
});

export default NftCardLoader;
