import React, { use, useCallback, useEffect, useState } from "react";
import { Image, TextInput } from "react-native";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import ScreenLayout from "../screen-layout/screenLayout";
import SettingsIcon from "../../assets/images/footer/sort.png";
import SearchIcon from "../../assets/images/footer/MagnifyingGlass.png";
import StakingNFTCard from "./staking-card";
import {
  NftListForStakingApi,
  PmtStakingListApi
} from "../../../utils/api/methods-marketplace";
import { getUserInfo } from "../../../utils/storage/AsyncStorageService";
import PMTStakingCard from "./pmt-card";
import { handleInitPmtStake, handleNftStaking } from "../common";

import Toast from "react-native-toast-message";
// import { useWalletConnect } from "@walletconnect/react-native-dapp";

const StakingScreen = () => {
  const [selectedTab, setSelectedTab] = useState("NFT");
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState({});
  const [nftStakingData, setNFTStakingData] = useState([]);
  const [pmtPlanList, setPmtPlanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [stakingAmount, setStakingAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);
  console.log("🚀 ~ StakingScreen ~ isStaking:", isStaking);
  const address = userData?.address;

  // const connector = useWalletConnect();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        if (userData) {
          setUserData(userData);
        }
      } catch (err) {
        console.error("Failed to load user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const fetchNftList = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const response = await NftListForStakingApi({
        method: "no",
        address
      });

      if (response?.data?.data) {
        setNFTStakingData(response.data.data);
      }
    } catch (error) {
      console.error(
        "❌ Failed to fetch nft list:",
        error?.response?.data || error.message || error
      );
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (userData) {
      if (address) {
        fetchNftList();
      } else {
        setIsLoading(false);
      }
    }
  }, [userData, address, fetchNftList]);

  const fetchPmtListPlan = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await PmtStakingListApi();
      if (response?.data?.data) {
        setPmtPlanList(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch PMT plan list:", error);
      Toast.show({
        text1: "Error",
        text2: "Failed to load staking plans. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPmtListPlan();
  }, [fetchPmtListPlan]);

  const handleNFTStakingtrigger = async (plan) => {
    console.log("trigerred NFT Staking");
    await handleNftStaking(plan, address);
  };

  const handlePMTStaking = async (plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);

    setTimeout(() => {
      console.log("Modal state after timeout:", isModalVisible);
    }, 100);
  };

  // Fixed: You'll need to implement this function or pass the required parameters
  const handleConfirmStake = async () => {
    if (!stakingAmount || !selectedPlan) return;

    setIsStaking(true);
    try {
      // const provider = new ethers.providers.Web3Provider(connector);
      // const signer = provider.getSigner();
      // Call your staking function here with the required parameters
      await handleInitPmtStake({
        stakingAmount: stakingAmount,
        selectedPlan: selectedPlan,
        address: address,
        setIsStaking
        // signer
        // Add other required parameters
      });

      // Close modal on success
      setModalVisible(false);
      setStakingAmount("");
      setSelectedPlan({});

      Toast.show({
        text1: "Success",
        text2: "Staking completed successfully!"
      });
    } catch (error) {
      console.error("Staking failed:", error);
      Toast.show({
        text1: "Error",
        text2: "Staking failed. Please try again."
      });
    } finally {
      setIsStaking(false);
    }
  };

  const renderNFT = () => (
    <View style={styles.grid}>
      {Array.isArray(nftStakingData) &&
        nftStakingData.map((collection, index) => (
          <StakingNFTCard
            item={collection}
            key={index}
            onStake={handleNFTStakingtrigger}
          />
        ))}
    </View>
  );

  const renderPMT = () => (
    <View style={styles.pmtContainer}>
      {pmtPlanList.map((plan, index) => (
        <PMTStakingCard key={index} plan={plan} onStake={handlePMTStaking} />
      ))}
    </View>
  );

  return (
    <>
      <ScreenLayout>
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
                style={
                  selectedTab === "NFT" ? styles.activeText : styles.tabText
                }
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
                style={
                  selectedTab === "PMT" ? styles.activeText : styles.tabText
                }
              >
                PMT
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTab === "NFT" ? renderNFT() : renderPMT()}
        </ScrollView>
      </ScreenLayout>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          console.log("Modal onRequestClose called");
          if (!isStaking) setModalVisible(false);
        }}
        statusBarTranslucent={true}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {selectedPlan
                ? `Stake PMT - ${selectedPlan.name}`
                : "Token Staking"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Amount of PMT to stake"
              value={stakingAmount}
              onChangeText={setStakingAmount}
              editable={!isStaking}
              keyboardType="numeric"
            />

            <Text style={styles.readOnlyText}>Plan: {selectedPlan?.name}</Text>
            <Text style={styles.readOnlyText}>
              Duration: {selectedPlan?.duration} days
            </Text>
            <Text style={styles.readOnlyText}>
              ROI: {selectedPlan?.interest}%
            </Text>

            <TouchableOpacity
              onPress={handleConfirmStake}
              style={[
                styles.button,
                isStaking || !stakingAmount ? styles.buttonDisabled : null
              ]}
              disabled={isStaking || !stakingAmount}
            >
              <Text style={styles.buttonText}>
                {isStaking ? "Processing..." : "Confirm Stake"}
              </Text>
            </TouchableOpacity>

            {!isStaking && (
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
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
    borderColor: "#FFFFF",
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
  pmtContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 1000 // For Android
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 10,
    zIndex: 10000,
    elevation: 1001, // For Android
    shadowColor: "#000", // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  readOnlyText: {
    fontSize: 14,
    marginVertical: 2
  },
  button: {
    backgroundColor: "#FFE501",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10
  },
  buttonDisabled: {
    backgroundColor: "#ddd"
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000"
  },
  cancelText: {
    color: "#999",
    textAlign: "center",
    marginTop: 10
  }
});

export default StakingScreen;
