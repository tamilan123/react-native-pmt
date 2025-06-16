import React, { useState, useEffect } from "react";
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
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import ScreenLayout from "../screen-layout/screenLayout";
import SettingsIcon from "../../assets/images/footer/sort.png";
import SearchIcon from "../../assets/images/footer/MagnifyingGlass.png";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 2 columns with padding

const DAOVotingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Active Polls");
  const [searchQuery, setSearchQuery] = useState("");
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for polls
  const mockPolls = [
    {
      id: 1,
      title: "Increase Staking Rewards to 10%",
      status: "Active",
      endTime: "60d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",

        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 2,
      title: "Increase Staking Rewards to 10%",
      status: "Ending Soon",
      endTime: "0d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",

        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 3,
      title: "Increase Staking Rewards to 10%",
      status: "Active",
      endTime: "60d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 4,
      title: "Increase Staking Rewards to 10%",
      status: "Ending Soon",
      endTime: "0d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 5,
      title: "Increase Staking Rewards to 10%",
      status: "Ending Soon",
      endTime: "0d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 6,
      title: "Increase Staking Rewards to 10%",
      status: "Active",
      endTime: "60d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b2292aa5?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 7,
      title: "Increase Staking Rewards to 10%",
      status: "Active",
      endTime: "60d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b2292aa5?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    },
    {
      id: 8,
      title: "Increase Staking Rewards to 10%",
      status: "Active",
      endTime: "60d 03h 15m",
      voters: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b2292aa5?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      ],
      voterCount: "5.3K"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPolls = async () => {
      try {
        setLoading(true);

        // Uncomment for actual API call
        // const response = await fetch('/api/dao/polls');
        // const data = await response.json();
        // setPolls(data);

        // Mock delay
        setTimeout(() => {
          setPolls(mockPolls);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching polls:", error);
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = (pollId) => {
    console.log("Vote on poll:", pollId);
    // API call to vote
    // submitVote(pollId, voteChoice);
  };

  const filteredPolls = polls.filter((poll) =>
    poll.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPollCard = ({ item, index }) => (
    <View style={[styles.pollCard, { marginRight: index % 2 === 0 ? 16 : 0 }]}>
      {/* Timer Header */}
      <View style={styles.timerHeader}>
        <Text style={styles.timerText}>Voting Ends in: {item.endTime}</Text>
      </View>

      {/* Status and Voters */}
      <View style={styles.pollCardContent}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              item.status === "Active"
                ? styles.activeBadge
                : styles.endingSoonBadge
            ]}
          >
            <View
              style={[
                styles.statusDot,
                item.status === "Active"
                  ? styles.activeDot
                  : styles.endingSoonDot
              ]}
            />
            <Text
              style={[
                styles.statusText,
                item.status === "Active"
                  ? styles.activeText
                  : styles.endingSoonText
              ]}
            >
              {item.status}
            </Text>
          </View>

          <View style={styles.votersSection}>
            <View style={styles.voterAvatars}>
              {item.voters.map((voter, index) => (
                <Image
                  key={index}
                  source={{ uri: voter }}
                  style={[
                    styles.voterAvatar,
                    { marginLeft: index > 0 ? -8 : 0 }
                  ]}
                />
              ))}
            </View>
            <Text style={styles.voterCount}>+{item.voterCount}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.pollTitle}>{item.title}</Text>

        {/* Vote Button */}
        <TouchableOpacity
          style={styles.voteButton}
          onPress={() => handleVote(item.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.voteButtonText}>Vote Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
            <Image source={SearchIcon} style={styles.searchIcon} />
          </View>

          <TouchableOpacity style={styles.settingsButton}>
            <Image source={SettingsIcon} style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {["Active Polls", "Voting Results"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab ? styles.activeTab : styles.inactiveTab
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab
                    ? styles.activeTabText
                    : styles.inactiveTabText
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FDE047" />
            <Text style={styles.loadingText}>Loading polls...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPolls}
            renderItem={renderPollCard}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.pollsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  header: {
    backgroundColor: "#FDE047",
    paddingVertical: 12,
    alignItems: "center"
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  logoCircle: {
    width: 32,
    height: 32,
    backgroundColor: "#374151",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold"
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151"
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center"
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
    borderColor: "#D1D5DB",
    marginRight: 10
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    paddingVertical: 0
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  settingsButton: {
    backgroundColor: "#1F2937",
    borderRadius: 5
    // padding: 2
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
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 15,
    marginRight: 16
  },
  activeTab: {
    backgroundColor: "#D4D4D8"
  },
  inactiveTab: {
    backgroundColor: "#FFFFFF"
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600"
  },
  activeTabText: {
    color: "#000000"
  },
  inactiveTabText: {
    color: "#000000"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 16
  },
  pollsList: {
    paddingHorizontal: 16,
    paddingBottom: 100
  },
  pollCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    // padding: 16,
    marginBottom: 16,
    width: cardWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  pollCardContent: {
    padding: 16
  },
  timerHeader: {
    backgroundColor: "#000000",
    paddingHorizontal: 12,
    paddingVertical: 4,
    // borderRadius: 8,
    alignSelf: "flex-start",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 12
  },
  timerText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600"
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15
  },
  activeBadge: {
    backgroundColor: "#71B243"
  },
  endingSoonBadge: {
    backgroundColor: "#FF6C00"
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },
  activeDot: {
    backgroundColor: "#1E4800"
  },
  endingSoonDot: {
    backgroundColor: "#FFFFFF"
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600"
  },
  activeText: {
    color: "#000000"
  },
  endingSoonText: {
    color: "#000000"
  },
  votersSection: {
    flexDirection: "row",
    alignItems: "center"
  },
  voterAvatars: {
    flexDirection: "row"
  },
  voterAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#FFFFFF"
  },
  voterCount: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 8
  },
  pollTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 16,
    lineHeight: 24
  },
  voteButton: {
    backgroundColor: "#FDE047",
    paddingVertical: 1,
    borderRadius: 6,
    alignItems: "center",
    borderColor: "#000000",
    borderWidth: 1
  },
  voteButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "400"
  }
});

// API Integration Functions (commented for future use)
/*
// Install required dependencies:
// npm install react-native-vector-icons
// For iOS: cd ios && pod install

// Fetch all polls from API
const fetchPolls = async () => {
  try {
    const response = await fetch('/api/dao/polls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch polls');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching polls:', error);
    throw error;
  }
};

// Submit vote for a poll
const submitVote = async (pollId, voteChoice) => {
  try {
    const response = await fetch(`/api/dao/polls/${pollId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ 
        choice: voteChoice,
        // Add other vote details like voter address, signature, etc.
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit vote');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

// Get auth token from AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};
*/

export default DAOVotingPage;
