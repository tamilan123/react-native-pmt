import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PMTStakingCard = ({ plan, index, onStake = () => {} }) => {
  return (
    <View key={index} style={styles.pmtCard}>
      <Text style={styles.cardTitle}>{plan.name}</Text>
      <Text style={styles.cardSub}>Duration: {plan.duration}</Text>
      <Text style={styles.cardSub}>ROI: {plan.interest}</Text>
      <TouchableOpacity
        style={styles.stakeButton}
        onPress={() => onStake?.(plan)}
      >
        <Text style={styles.stakeButtonText}>
          {plan?.stake_token ? "Already Staked" : "Stake"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pmtCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16
  },
  cardTitle: {
    color: "#000000",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10
  },
  cardSub: {
    color: "#374151",
    fontSize: 12,
    marginBottom: 4
  },
  stakeButton: {
    backgroundColor: "#FFE500",
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1
  },
  stakeButtonText: {
    fontWeight: "bold",
    color: "#000"
  }
});

export default PMTStakingCard;
