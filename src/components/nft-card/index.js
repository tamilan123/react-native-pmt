import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

const NFTCard = ({ item }) => {
  // const imgSrc = `https://ipfs.io/ipfs/${item?.image_hash}`;
  const imgSrc = `https://gateway.pinata.cloud/ipfs/${item?.image_hash}`;

  const navigation = useNavigation();
  const route = useRoute();
  const slug = item.address;

  return (
    <TouchableOpacity
      style={[styles.nftCard, { width: CARD_WIDTH }]}
      onPress={() => {
        navigation.push("item-details", { slug });
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imgSrc }} style={styles.nftImage} />
      </View>

      <View style={styles.cardContent}>
        <Text
          numberOfLines={route.name === "item-details" ? 1 : 2}
          style={styles.nftTitle}
        >
          {item.name}
        </Text>
        <Text style={styles.nftEdition}>
          {item.collection_type === "single" ? "Single" : "Multiple"}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {item?.resale_price ? item.resale_price : item.instant_sale_price}{" "}
            PMT
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
