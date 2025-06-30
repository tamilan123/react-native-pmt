import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import PmtStakingTable from "../../../components/staking-tabs/pmt-staking-tabs";
import NftUnStakingTabs from "../../../components/staking-tabs/nft-unstaking-tabs";

const StakingTabs = ({ userInfo }) => {
  const [activeTab, setActiveTab] = useState("pmt");

  const tabs = [
    { key: "pmt", title: "PMT" },
    { key: "nft", title: "NFT" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "pmt":
        return <PmtStakingTable userInfo={userInfo} />;
      case "nft":
        return (
          <View style={styles.nftContainer}>
            <NftUnStakingTabs userInfo={userInfo} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab List */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key ? styles.activeText : ""
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff"
  // },
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
  tabText: {
    color: "#1F2937",
    fontWeight: "600"
  },
  activeText: {
    color: "#000000",
    fontWeight: "700"
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  activeTab: {
    // backgroundColor: "#FFE501",
    // borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#D4D4D8"
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666"
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600"
  },
  tabContent: {
    flex: 1
  },
  nftContainer: {
    flex: 1,

    borderRadius: 12,
    padding: 16
  }
});

export default StakingTabs;
