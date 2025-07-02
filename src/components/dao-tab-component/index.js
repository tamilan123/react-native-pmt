// DaoTabsComponent.js
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView
} from "react-native";
import VoteCard from "../vote-card";
import ViewCard from "../view-cards";
import { DaoViewListApi } from "../../../utils/api/methods-marketplace";
import ScreenLayout from "../screen-layout/screenLayout";
import { TextInput } from "react-native-paper";
import SettingsIcon from "../../assets/images/footer/sort.png";
import SearchIcon from "../../assets/images/footer/MagnifyingGlass.png";

export default function DaoTabsComponent() {
  const [selectedTab, setSelectedTab] = useState("active_polls");
  const [activePolls, setActivePolls] = useState([]);
  const [votingResults, setVotingResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoadingActive, setIsLoadingActive] = useState(true);
  const [isLoadingInactive, setIsLoadingInactive] = useState(true);

  useEffect(() => {
    fetchVoteDetails("active", setActivePolls, setIsLoadingActive);
    fetchVoteDetails("inactive", setVotingResults, setIsLoadingInactive);
  }, []);

  const fetchVoteDetails = async (status, setData, setLoading) => {
    setLoading(true);
    try {
      const response = await DaoViewListApi(status);
      if (response) {
        setData(response?.data?.questions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = useCallback((questionId) => {
    setActivePolls((prev) =>
      prev.map((poll) =>
        poll.id === questionId ? { ...poll, user_voted_option: true } : poll
      )
    );
  }, []);

  // Filter data based on search text
  const filteredData = useMemo(() => {
    const currentData =
      selectedTab === "active_polls" ? activePolls : votingResults;
    if (!searchText.trim()) return currentData;

    return currentData.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.question?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [selectedTab, activePolls, votingResults, searchText]);

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              mode="flat"
              dense
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
          </View>

          <TouchableOpacity style={styles.settingsButton}>
            <Image source={SettingsIcon} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.tabHeader}>
            <TouchableOpacity onPress={() => setSelectedTab("active_polls")}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "active_polls" && styles.activeTab
                ]}
              >
                Active Polls
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedTab("voting_results")}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "voting_results" && styles.activeTab
                ]}
              >
                Voting Results
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                {selectedTab === "active_polls" ? (
                  <VoteCard data={item} onVoted={() => handleVote(item.id)} />
                ) : (
                  <ViewCard data={item} />
                )}
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {searchText.trim()
                  ? "No results found for your search."
                  : selectedTab === "active_polls"
                  ? "No active proposals available."
                  : "No voting results yet."}
              </Text>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </SafeAreaView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6"
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  searchIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginRight: 8,
    tintColor: "#9CA3AF"
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 0,
    height: 40
  },
  settingsButton: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  settingsIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#FFFFFF"
  },
  tabHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 4
  },
  tabText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12
  },
  activeTab: {
    fontWeight: "600",
    color: "#1F2937",
    backgroundColor: "#E5E7EB",
    borderRadius: 8
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 40,
    fontSize: 16
  },
  itemWrapper: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 16
  },
  flatListContent: {
    paddingBottom: 20
  }
});
