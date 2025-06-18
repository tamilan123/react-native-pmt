import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import NftCardLoader from "../nft-card-loader";

const { width } = Dimensions.get("window");

const CardDetailsPageLoader = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox} />
        <View style={styles.heartIcon} />
      </View>

      <SkeletonPlaceholder borderRadius={16}>
        <View style={styles.mainImage} />
      </SkeletonPlaceholder>

      <View style={styles.textSection}>
        <SkeletonPlaceholder>
          <View style={styles.titleLine} />
          <View style={styles.subtitleLine} />
          <View style={styles.smallTextLine} />
          <View style={styles.smallTextLine} />
          <View style={styles.smallTextLine} />
          <View style={styles.metaRow}>
            <View style={styles.metaBox1} />
            <View style={styles.metaBox2} />
          </View>
          <View style={styles.ctaButton} />
        </SkeletonPlaceholder>
      </View>

      <View style={styles.infoCardsSection}>
        {[...Array(3)].map((_, index) => (
          <SkeletonPlaceholder borderRadius={12} key={index}>
            <View style={styles.infoCard}>
              <View style={styles.infoTitle} />
              <View style={styles.infoRow}>
                <View style={styles.infoAvatar} />
                <View style={styles.infoTextBlock}>
                  <View style={styles.infoLine} />
                  {index === 2 && <View style={styles.infoLine} />}
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        ))}
      </View>

      <View style={styles.relatedProducts}>
        <Text style={styles.relatedTitle}>Related Products</Text>
        <View style={styles.nftGrid}>
          {[...Array(4)].map((_, index) => (
            <NftCardLoader key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFE500",
    padding: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#ddd",
    borderRadius: 8
  },
  heartIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#ddd",
    borderRadius: 16
  },
  mainImage: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  textSection: {
    marginBottom: 20
  },
  titleLine: {
    width: "70%",
    height: 32,
    borderRadius: 8,
    marginBottom: 8
  },
  subtitleLine: {
    width: "50%",
    height: 28,
    borderRadius: 8,
    marginBottom: 16
  },
  smallTextLine: {
    width: "80%",
    height: 14,
    borderRadius: 6,
    marginBottom: 6
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
    alignItems: "center"
  },
  metaBox1: {
    width: 100,
    height: 14,
    borderRadius: 6
  },
  metaBox2: {
    width: 60,
    height: 12,
    borderRadius: 6
  },
  ctaButton: {
    width: "80%",
    height: 40,
    borderRadius: 8,
    marginTop: 24
  },
  infoCardsSection: {
    marginTop: 32,
    gap: 16
  },
  infoCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 16
  },
  infoTitle: {
    width: 100,
    height: 14,
    borderRadius: 6,
    marginBottom: 12
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  infoAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  infoTextBlock: {
    flex: 1,
    gap: 6
  },
  infoLine: {
    height: 14,
    width: "100%",
    borderRadius: 6
  },
  relatedProducts: {
    marginTop: 32
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16
  },
  nftGrid: {
    gap: 16
  }
});

export default CardDetailsPageLoader;
