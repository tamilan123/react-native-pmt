import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");

const NFTCardLoader = () => {
  return (
    <SkeletonPlaceholder borderRadius={12}>
      <View style={styles.cardContainer}>
        <View style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.title} />
          <View style={styles.row}>
            <View style={styles.smallBar1} />
            <View style={styles.smallBar2} />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.8,
    height: 360,
    borderRadius: 16,
    marginBottom: 20,
    alignSelf: "center"
  },
  image: {
    height: "65%",
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  infoContainer: {
    padding: 16
  },
  title: {
    height: 20,
    width: "70%",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  smallBar1: {
    width: "40%",
    height: 12,
    borderRadius: 8
  },
  smallBar2: {
    width: "25%",
    height: 12,
    borderRadius: 8
  }
});

export default NFTCardLoader;
