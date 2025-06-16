import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import { Search } from "lucide-react-native";

import ExploreActive from "../../assets/images/footer/explore_y.png";
import ExploreDefault from "../../assets/images/footer/explore_w.png";
import DaoActive from "../../assets/images/footer/dao_y.png";
import DaoDefault from "../../assets/images/footer/dao_w.png";
import StakingActive from "../../assets/images/footer/staking_y.png";
import StakingDefault from "../../assets/images/footer/staking_w.png";
import SwapActive from "../../assets/images/footer/swap_y.png";
import SwapDefault from "../../assets/images/footer/swap_w.png";
import ActiveProfile from "../../assets/images/footer/profile_y.png";
import DefaultProfile from "../../assets/images/footer/profile_w.png";
import FilterIcon from "../../assets/images/footer/filter.png";
import SettingsIcon from "../../assets/images/footer/sort.png";
import PMTLogo from "../../assets/images/logo.png";
import SearchIcon from "../../assets/images/footer/MagnifyingGlass.png";

import NFTCard from "../nft-card";

import Footer from "../footer";
import ScreenLayout from "../screen-layout/screenLayout";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 60) / 2;

const ExploreScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Explore");

  const nftData = [
    {
      id: 1,
      title: "Rocketbyz x PMT\nLoyalty NFTs",
      edition: "Edition 92 of 1001",
      price: "3885 PMT",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
      gradient: ["#D4AF37", "#FFE500"]
    },
    {
      id: 2,
      title: "Rocketbyz x PMT\nLoyalty NFTs",
      edition: "Edition 92 of 1001",
      price: "3885 PMT",
      image:
        "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=300&h=300&fit=crop",
      gradient: ["#8B5CF6", "#06B6D4"]
    },
    {
      id: 3,
      title: "Rocketbyz x PMT\nLoyalty NFTs",
      edition: "Edition 92 of 1001",
      price: "3885 PMT",
      image:
        "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=300&fit=crop",
      gradient: ["#EC4899", "#06B6D4"]
    },
    {
      id: 4,
      title: "Rocketbyz x PMT\nLoyalty NFTs",
      edition: "Edition 92 of 1001",
      price: "3885 PMT",
      image:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&h=300&fit=crop",
      gradient: ["#F59E0B", "#06B6D4"]
    },
    {
      id: 5,
      title: "Rocketbyz x PMT\nLoyalty NFTs",
      edition: "Edition 92 of 1001",
      price: "3885 PMT",
      image:
        "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=300&fit=crop",
      gradient: ["#8B5CF6", "#EC4899"]
    },
    {
      id: 6,
      title: "Rocketbyz x PMT\nLoyalty NFTs",
      edition: "Edition 92 of 1001",
      price: "3885 PMT",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
      gradient: ["#EF4444", "#F97316"]
    }
  ];

  const bottomTabs = [
    {
      name: "Explore",
      icon: "Search",
      active_icon: ExploreActive,
      default_icon: ExploreDefault,
      active: true
    },
    {
      name: "DAO",
      icon: "BarChart3",
      active_icon: DaoActive,
      default_icon: DaoDefault,
      active: false
    },
    {
      name: "Staking",
      icon: "Coins",
      active_icon: StakingActive,
      default_icon: StakingDefault,
      active: false
    },
    {
      name: "Swap",
      icon: "ArrowUpDown",
      active_icon: SwapActive,
      default_icon: SwapDefault,
      active: false
    },
    {
      name: "Profile",
      icon: "User",
      active_icon: ActiveProfile,
      default_icon: DefaultProfile,
      active: false
    }
  ];

  const renderIcon = (iconName, size = 24, color = "#FFFFFF") => {
    const iconProps = { size, color, strokeWidth: 2 };

    switch (iconName) {
      case "Search":
        return <Search {...iconProps} />;

      default:
        return <Search {...iconProps} />;
    }
  };

  const BottomTab = ({ tab, isActive, onPress }) => (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={isActive ? tab.active_icon : tab.default_icon}
        style={styles.tabIcon}
      />
    </TouchableOpacity>
  );

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Image source={FilterIcon} style={styles.filterIcon} />
          </TouchableOpacity>

          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
            <Image source={SearchIcon} style={{ width: 20, height: 20 }} />
          </View>

          <TouchableOpacity style={styles.settingsButton}>
            <Image source={SettingsIcon} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.nftGrid}>
            {nftData.map((item) => (
              <NFTCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "#FFE500"
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  logo: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12
  },
  filterButton: {
    backgroundColor: "#1F2937",
    borderRadius: 5
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 30,
    gap: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB"
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    paddingVertical: 0
  },
  settingsButton: {
    backgroundColor: "#1F2937",
    borderRadius: 5
    // padding: 2
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 100
  },
  nftGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  nftCard: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden"
  },
  imageContainer: {
    position: "relative",
    height: CARD_WIDTH * 0.8
  },
  nftImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  buyButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600"
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: "#374151"
  },
  navBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
    opacity: 0.95
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8
  },
  tabLabel: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4
  },
  activeTabLabel: {
    color: "#FFE55C"
  },
  filterIcon: {
    width: 40,
    height: 40,
    minWidth: 30,
    minHeight: 30,
    maxWidth: 40,
    maxHeight: 40,
    resizeMode: "contain"
  },
  settingsIcon: {
    width: 40,
    height: 40,
    minWidth: 30,
    minHeight: 30,
    maxWidth: 40,
    maxHeight: 40,
    resizeMode: "contain"
  },
  tabIcon: {
    width: 36,
    height: 36,
    minWidth: 30,
    minHeight: 30,
    maxWidth: 45,
    maxHeight: 45,
    resizeMode: "contain"
  }
});

export default ExploreScreen;
