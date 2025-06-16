import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dogimg from "../../assets/images/astdog.png";
import rocks from "../../assets/images/rockzz.png";

const CollectionCard = ({
  title,
  type,
  description,
  nftCount,
  imgSrc,
  typeShow
}) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("Marketplace", { nft_type: type });
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <View style={styles.imageRow}>
          <Image source={dogimg} style={styles.avatar} />
          <Image source={rocks} style={styles.avatar} />
        </View>
        <View style={styles.nftInfo}>
          <Text style={styles.nftLabel}>NFTs</Text>
          <Text style={styles.nftCount}>{nftCount}+</Text>
        </View>
      </View>

      <View style={styles.detailsWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{typeShow}</Text>
          <Text style={styles.description}>{description}</Text>

          <TouchableOpacity onPress={handleNavigate} style={styles.button}>
            <Text style={styles.buttonText}>EXPLORE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={imgSrc} style={styles.mainImage} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000",
    borderRadius: 16,
    padding: 16,
    marginVertical: 12
  },
  iconWrapper: {
    marginBottom: 20
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12
  },
  nftInfo: {
    marginTop: 16
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
    marginTop: 16
  },
  contentWrapper: {
    marginBottom: 20
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },
  subtitle: {
    color: "#FFFFFF9E",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8
  },
  button: {
    backgroundColor: "#FFE501",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 12,
    alignSelf: "flex-start"
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600"
  },
  imageWrapper: {
    marginTop: 12
  },
  mainImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFE501"
  }
});

export default CollectionCard;
