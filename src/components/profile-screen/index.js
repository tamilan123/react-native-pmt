import React, { useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import ScreenLayout from "../screen-layout/screenLayout";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingsIcon from "../../assets/images/footer/sort.png";
import SearchIcon from "../../assets/images/footer/MagnifyingGlass.png";
import FilterIcon from "../../assets/images/footer/filter.png";

const { width } = Dimensions.get("window");

const NFTProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Collectible");
  const [searchText, setSearchText] = useState("");
  const [isSearchBarSticky, setIsSearchBarSticky] = useState(false);
  const searchBarRef = useRef(null);

  const nftData = [
    {
      id: 1,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 19 of 1001",
      price: "3885 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "collectible"
    },
    {
      id: 2,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 20 of 1001",
      price: "3885 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "collectible"
    },
    {
      id: 3,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 20 of 1001",
      price: "3885 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "collectible"
    },
    {
      id: 4,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 20 of 1001",
      price: "3885 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "collectible"
    },
    {
      id: 5,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 20 of 1001",
      price: "3885 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "collectible"
    },
    {
      id: 6,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 21 of 1001",
      price: "2500 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "onsale"
    },
    {
      id: 7,
      title: "Rocketbyz x PMT Loyalty NFTs",
      edition: "Edition 22 of 1001",
      price: "4200 PMT",
      image: {
        uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop"
      },
      type: "staking"
    }
  ];

  const tabs = ["Collectible", "On Sale", "Staking", "Track Asset"];

  const filteredNFTs = useMemo(() => {
    let filtered = nftData;

    switch (activeTab) {
      case "Collectible":
        filtered = nftData.filter((nft) => nft.type === "collectible");
        break;
      case "On Sale":
        filtered = nftData.filter((nft) => nft.type === "onsale");
        break;
      case "Staking":
        filtered = nftData.filter((nft) => nft.type === "staking");
        break;
      case "Track Asset":
        filtered = [];
        break;
      default:
        filtered = nftData.filter((nft) => nft.type === "collectible");
    }

    if (searchText.trim()) {
      filtered = filtered.filter(
        (nft) =>
          nft.title.toLowerCase().includes(searchText.toLowerCase()) ||
          nft.edition.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchText]);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Approximate position where search bar would be (after trading banner + profile + tabs)
    const searchBarPosition = 110 + 75 + 60; // banner height + profile height + tabs height

    if (scrollY >= searchBarPosition && !isSearchBarSticky) {
      setIsSearchBarSticky(true);
    } else if (scrollY < searchBarPosition && isSearchBarSticky) {
      setIsSearchBarSticky(false);
    }
  };

  const renderNFTCard = (item, index) => (
    <TouchableOpacity key={item.id} style={styles.nftCard} activeOpacity={0.8}>
      <Image source={item.image} style={styles.nftImage} />
      <View style={styles.nftInfo}>
        <Text style={styles.nftTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.nftEdition}>{item.edition}</Text>
        <Text style={styles.nftPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderNFTGrid = () => {
    const rows = [];
    for (let i = 0; i < filteredNFTs.length; i += 2) {
      const leftItem = filteredNFTs[i];
      const rightItem = filteredNFTs[i + 1];

      rows.push(
        <View key={i} style={styles.row}>
          {renderNFTCard(leftItem, i)}
          {rightItem && renderNFTCard(rightItem, i + 1)}
        </View>
      );
    }
    return rows;
  };

  const renderEmptyState = () => {
    let message = "No items found";
    let subMessage = "";

    switch (activeTab) {
      case "On Sale":
        message = "No NFTs on sale";
        subMessage = "Your NFTs will appear here when listed for sale";
        break;
      case "Staking":
        message = "No staked NFTs";
        subMessage = "Stake your NFTs to earn rewards";
        break;
      case "Track Asset":
        message = "Track your asset performance";
        subMessage = "Coming soon...";
        break;
      case "Collectible":
        message = searchText
          ? "No collectibles match your search"
          : "No collectibles found";
        subMessage = searchText ? "Try adjusting your search terms" : "";
        break;
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>{message}</Text>
        {subMessage ? (
          <Text style={styles.emptySubText}>{subMessage}</Text>
        ) : null}
      </View>
    );
  };

  const renderContent = () => {
    if (activeTab === "Track Asset") {
      return renderEmptyState();
    }

    if (filteredNFTs.length === 0) {
      return renderEmptyState();
    }

    return <View style={styles.nftGrid}>{renderNFTGrid()}</View>;
  };

  const renderSearchBar = (isSticky = false) => (
    <View
      style={[styles.searchContainer, isSticky && styles.stickySearchContainer]}
    >
      <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
        <Image source={FilterIcon} style={styles.filterIcon} />
      </TouchableOpacity>

      <View style={styles.searchInputContainer}>
        <Image source={SearchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search NFTs..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.settingsButton} activeOpacity={0.8}>
        <Image source={SettingsIcon} style={styles.settingsIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.container}>
        {/* Sticky Search Bar - shows when scrolled */}
        {isSearchBarSticky && renderSearchBar(true)}

        {/* Main Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Trading Banner Background */}
          <View style={styles.tradingBanner}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=200&fit=crop"
              }}
              style={styles.tradingBackground}
            />
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require("../../assets/images/Rectangle.png")}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Unnamed</Text>
                <Text style={styles.profileAddress}>0x860.....bd58</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === tab && styles.activeTabText
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Original Search and Filter Bar */}
          <View ref={searchBarRef}>{renderSearchBar(false)}</View>

          {/* Tab Content */}
          <View style={styles.content}>{renderContent()}</View>
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  scrollView: {
    flex: 1
  },
  tradingBanner: {
    height: 110,
    position: "relative",
    overflow: "hidden"
  },
  tradingBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  profileSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
    position: "relative"
  },
  profileImageContainer: {
    position: "absolute",
    top: -30,
    left: 20,
    zIndex: 10
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#FFFFFF"
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginLeft: 100
  },
  profileDetails: {
    flex: 1
  },
  profileName: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5
  },
  profileAddress: {
    color: "#000000",
    fontSize: 14,
    fontFamily: "monospace"
  },
  editButton: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  editButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500"
  },
  tabsContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#fff"
  },
  activeTab: {
    backgroundColor: "#D4D4D8"
  },
  tabText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500"
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    gap: 12
  },
  stickySearchContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  filterButton: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff"
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#D1D5DB"
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: "#9CA3AF"
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    paddingVertical: 0
  },
  clearButton: {
    marginLeft: 8,
    padding: 2
  },
  clearButtonText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "bold"
  },
  settingsButton: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  settingsIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff"
  },
  content: {
    backgroundColor: "#FFFFFF",
    minHeight: 400
  },
  nftGrid: {
    padding: 15
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  nftCard: {
    width: (width - 45) / 2,
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  nftImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover"
  },
  nftInfo: {
    padding: 12
  },
  nftTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    lineHeight: 18
  },
  nftEdition: {
    color: "#999",
    fontSize: 12,
    marginBottom: 8
  },
  nftPrice: {
    color: "#FFE500",
    fontSize: 16,
    fontWeight: "bold"
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
    minHeight: 300
  },
  emptyText: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8
  },
  emptySubText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20
  }
});

export default NFTProfilePage;
