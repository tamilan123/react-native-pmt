import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

const NFTCard = ({ item }) => (
  <View style={[styles.nftCard, { width: CARD_WIDTH }]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.nftImage} />
      <View style={styles.gradientOverlay} />
    </View>

    <View style={styles.cardContent}>
      <Text style={styles.nftTitle}>{item.title}</Text>
      <Text style={styles.nftEdition}>{item.edition}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default NFTCard;

const styles = StyleSheet.create({
  nftCard: {
    backgroundColor: "#000000",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden"
  },
  imageContainer: {
    position: "relative",
    height: CARD_WIDTH * 0.8,
    padding: 6
  },
  nftImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  cardContent: {
    padding: 12
  },
  nftTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    marginBottom: 4
  },
  nftEdition: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 12
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  price: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  buyButton: {
    backgroundColor: "#FFE500",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  buyButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600"
  }
});
