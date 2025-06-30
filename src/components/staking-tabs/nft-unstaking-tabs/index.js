import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  NftListForStakingApi,
  NftStakingApi
} from "../../../../utils/api/methods-marketplace";
import { ethers } from "ethers";
import NftStakingCard from "../../staking/staking-card";
// import { useWallet } from "../../../../context/WalletContext";
import stakingABI from "../../../abi/pmt-token-staking.json";
// import { useWalletClient } from 'wagmi';

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARDS_PER_ROW = 2;
const CARD_WIDTH =
  (width - (CARDS_PER_ROW + 1) * CARD_MARGIN * 2) / CARDS_PER_ROW;

const NftUnStakingTabs = ({ userInfo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnStaking, setIsUnStaking] = useState(false);
  const [stakingNftData, setStakingNftData] = useState([]);
  const isConnected = true;

  const navigation = useNavigation();
  const address = userInfo.address;

  const showToast = (title, description, type = "info") => {
    Alert.alert(title, description);
  };

  const fetchNftList = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const response = await NftListForStakingApi({
        method: "yes",
        address
      });
      console.log("🚀 ~ fetchNftList ~ response:", response);

      if (response?.data?.data) {
        setStakingNftData(response.data.data);
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
    if (address) {
      fetchNftList();
    } else {
      setIsLoading(false);
    }
  }, [address, fetchNftList]);

  const handleUnStakeClick = async (tokenId, nftAddess, onClose) => {
    if (!walletClient) {
      showToast(
        "Wallet Not Found",
        "Please connect your wallet first.",
        "error"
      );
      return;
    }

    if (!isConnected || !address) {
      showToast("Not Connected", "Please connect your wallet first.", "error");
      return;
    }

    setIsUnStaking(true);
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const stakingContract = new ethers.Contract(
        process.env.REACT_APP_STAKING_CONTRACT_ADDRESS,
        stakingABI,
        signer
      );

      const tx = await stakingContract.withdraw([tokenId]);

      showToast("Transaction Sent", "Waiting for confirmation...", "info");

      await tx.wait();
      const data = {
        method: "unstake",
        collectionId: nftAddess,
        hash: tx?.hash
      };

      updateStakingApi(data, onClose);
    } catch (error) {
      console.error("Unstake error:", error);
      const errorCode =
        error?.code === 4001 || error?.info?.error?.code === 4001;
      setIsUnStaking(false);

      if (errorCode) {
        showToast(
          "Transaction Cancelled",
          "You cancelled the transaction in your wallet.",
          "warning"
        );
      } else {
        showToast(
          "Unstake Failed",
          "Something went wrong while unstaking. Please try again.",
          "error"
        );
      }
    }
  };

  const updateStakingApi = async (data, closePopup) => {
    try {
      const response = await NftStakingApi(data);
      if (response) {
        showToast(
          "Unstaked Successfully",
          "Your NFT has been unstaked and transferred back to your wallet.",
          "success"
        );
        setIsUnStaking(false);
        fetchNftList();
        closePopup();
      }
    } catch (error) {
      setIsUnStaking(false);
      console.log("🚀 ~ updateStakingApi ~ error:", error);
    }
  };

  const renderNftCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <NftStakingCard
        data={item}
        onClick={handleUnStakeClick}
        isUnStaking={isUnStaking}
        style={{ width: CARD_WIDTH }}
      />
    </View>
  );

  const renderLoader = ({ index }) => (
    <View style={styles.cardContainer}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
      </View>
      <Text style={styles.emptyTitle}>No NFTs Available for Staking</Text>
      <Text style={styles.emptyDescription}>
        You don't have any eligible NFTs to stake right now. Mint or buy NFTs to
        get started!
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate("explore")}
      >
        <Text style={styles.browseButtonText}>Browse Marketplace</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return renderLoader({ index: 0 });
  }

  if (stakingNftData?.length === 0) {
    return renderEmptyState();
  }

  return (
    <FlatList
      data={stakingNftData}
      renderItem={renderNftCard}
      keyExtractor={(item, index) => `nft-${index}`}
      numColumns={CARDS_PER_ROW}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: CARD_MARGIN,
    flexGrow: 1
  },
  cardContainer: {
    margin: CARD_MARGIN,
    flex: 1,
    maxWidth: CARD_WIDTH
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 32
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16
  },
  emptyIcon: {
    fontSize: 32
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center"
  },
  emptyDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 24,
    lineHeight: 22
  },
  browseButton: {
    backgroundColor: "#FFE501",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  browseButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default NftUnStakingTabs;
