import React, { useState } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import ScreenLayout from "../screen-layout/screenLayout";

const nftStakingData = [
  {
    id: 1,
    title: "Rocketbyz x PMT Loyalty NFTs",
    image:
      "https://is.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Rocketbyz x PMT Loyalty NFTs",
    i: "https://is.unsplash.com/photo-1634193295627-1cdddf751ebf?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Rocketbyz x PMT Loyalty NFTs",
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Rocketbyz x PMT Loyalty NFTs",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Rocketbyz x PMT Loyalty NFTs",
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Rocketbyz x PMT Loyalty NFTs",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
  }
];

const pmtPlans = [
  { id: 1, title: "Plan 1", duration: 90, roi: 1.0 },
  { id: 2, title: "Plan 2", duration: 185, roi: 3.0 },
  { id: 3, title: "Plan 3", duration: 365, roi: 7.0 }
];

const StakingScreen = () => {
  const [selectedTab, setSelectedTab] = useState("NFT");

  // TODO: Replace this with API call
  // useEffect(() => {
  //   fetchPlans().then(res => setPlans(res));
  // }, []);

  const renderNFT = () => (
    <View style={styles.grid}>
      {nftStakingData.map((item) => (
        <View key={item.id} style={styles.nftCard}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.nftImage} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity style={styles.stakeButton}>
              <Text style={styles.stakeButtonText}>Stake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderPMT = () => (
    <View style={styles.pmtContainer}>
      {pmtPlans.map((plan) => (
        <View key={plan.id} style={styles.pmtCard}>
          <Text style={styles.cardTitle}>{plan.title}</Text>
          <Text style={styles.cardSub}>Duration: {plan.duration}</Text>
          <Text style={styles.cardSub}>ROI: {plan.roi}</Text>
          <TouchableOpacity style={styles.stakeButton}>
            <Text style={styles.stakeButtonText}>Stake</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <ScreenLayout>
      <ScrollView style={styles.container}>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "NFT" && styles.activeTab
            ]}
            onPress={() => setSelectedTab("NFT")}
          >
            <Text
              style={selectedTab === "NFT" ? styles.activeText : styles.tabText}
            >
              NFT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "PMT" && styles.activeTab
            ]}
            onPress={() => setSelectedTab("PMT")}
          >
            <Text
              style={selectedTab === "PMT" ? styles.activeText : styles.tabText}
            >
              PMT
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === "NFT" ? renderNFT() : renderPMT()}
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 12
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    marginRight: 10
  },
  activeTab: {
    backgroundColor: "#D1D5DB"
  },
  tabText: {
    color: "#1F2937",
    fontWeight: "600"
  },
  activeText: {
    color: "#000000",
    fontWeight: "700"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 30
  },
  nftCard: {
    width: "48%",
    backgroundColor: "#000000",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden" // clip image corners
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
  },

  nftImagePlaceholder: {
    height: 100,
    backgroundColor: "#1F2937",
    borderRadius: 8,
    marginBottom: 10
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 10
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
  },
  pmtContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20
  },
  pmtCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16
  },
  cardSub: {
    color: "#374151",
    fontSize: 12,
    marginBottom: 4
  }
});

export default StakingScreen;
