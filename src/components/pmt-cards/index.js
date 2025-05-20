import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PMTCard = ({ title, type, description, nftCount, imgSrc, typeShow }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Marketplace", { nft_type: type });
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <View style={styles.avatarGroup}>
          <Image
            source={require("../../../images/astdog.png")}
            style={styles.avatar}
            resizeMode="contain"
          />
          <Image
            source={require("../../../images/rockzz.png")}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.nftInfo}>
          <Text style={styles.nftLabel}>NFTs</Text>
          <Text style={styles.nftCount}>{nftCount}+</Text>
        </View>
      </View>

      <View style={styles.detailsWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.typeShow}>{typeShow}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleNavigate}
          >
            <Text style={styles.exploreText}>EXPLORE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={imgSrc} style={styles.image} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    gap: 16
  },
  iconWrapper: {
    gap: 24
  },
  avatarGroup: {
    flexDirection: "row"
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: -20,
    backgroundColor: "#222"
  },
  nftInfo: {
    gap: 8
  },
  nftLabel: {
    color: "#FFE501",
    fontSize: 24,
    fontWeight: "bold"
  },
  nftCount: {
    color: "#FFE501",
    fontSize: 48,
    fontWeight: "bold"
  },
  detailsWrapper: {
    flexDirection: "row",
    gap: 16
  },
  contentWrapper: {
    flex: 1,
    gap: 8
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  typeShow: {
    color: "#FFFFFF9E",
    fontWeight: "bold"
  },
  description: {
    color: "#FFFFFF"
  },
  exploreButton: {
    backgroundColor: "#FFE501",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 8
  },
  exploreText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  imageWrapper: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFE501"
  }
});

export default PMTCard;
