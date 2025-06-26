import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const StakingNftCard = ({ item, onStake }) => {
  const image_hash = item?.image_hash;
  const imgSrc = `https://gateway.pinata.cloud/ipfs/${image_hash}`;
  return (
    <View key={item?.id} style={styles.nftCard}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imgSrc }} style={styles.nftImage} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity
          style={styles.stakeButton}
          onPress={() => onStake?.(item)}
        >
          <Text style={styles.stakeButtonText}>Stake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nftCard: {
    width: "48%",
    backgroundColor: "#000000",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden"
  },
  imageWrapper: {
    padding: 10
  },
  nftImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    resizeMode: "cover"
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8
  },
  stakeButton: {
    backgroundColor: "#FFE500",
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center"
  },
  stakeButtonText: {
    color: "#000",
    fontWeight: "600"
  }
});

export default StakingNftCard;
