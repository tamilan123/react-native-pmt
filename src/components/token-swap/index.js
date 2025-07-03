import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  REACT_NATIVE_WBNB_TESTNET,
  REACT_NATIVE_USDT_TESTNET,
  REACT_NATIVE_PMT_TESTNET,
  REACT_NATIVE_DAI_TESTNET,
  REACT_NATIVE_ETH_TESTNET,
  REACT_NATIVE_MATIC_TESTNET,
  REACT_NATIVE_LINK_TESTNET,
  REACT_NATIVE_TBNB_TESTNET
} from "@env";
import { Picker } from "@react-native-picker/picker";
// Note: You'll need to install these packages:
// npm install @react-native-picker/picker react-native-svg

// Import your images - you'll need to add these to your assets
import PMTTokenImage from "../../assets/images/logo.png";
import EthIcon from "../../assets/icon/ETH.png";
import binace from "../../assets/images/binace-black.png";
import dai from "../../assets/images/dai-logo.avif";
import usdt from "../../assets/images/usdt-logo.png";

// You'll need to implement these utilities for React Native
// import { useWallet } from "../../context/WalletContext";
import { formatBalance, getAmountsOut } from "./common";
import {
  TokenSwapApi,
  TokenSwapListApi
} from "../../../utils/api/methods-marketplace";
import { getCookies } from "../../../utils/cookies";
import swapTokens from "./common";
import ScreenLayout from "../screen-layout/screenLayout";
import SuccessLogo from "../../assets/images/footer/check_circle.png";
import WarningLogo from "../../assets/images/footer/Warning.png";
import CancelLogo from "../../assets/images/footer/cancel.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "../../../utils/storage/AsyncStorageService";

const { width } = Dimensions.get("window");

export const tokenList = [
  {
    id: 1,
    name: "PMT",
    avatar: PMTTokenImage
  },
  {
    id: 2,
    name: "tBNB",
    avatar: binace
  },
  {
    id: 3,
    name: "ETH",
    avatar: EthIcon
  },
  {
    id: 4,
    name: "DAI",
    avatar: dai
  },
  {
    id: 5,
    name: "USDT",
    avatar: usdt
  }
];

const TokenSwapScreen = () => {
  const [selectedToken, setSelectedToken] = useState(1);
  const [selectedTokenTo, setSelectedTokenTo] = useState(2);
  const [showFromTokenPicker, setShowFromTokenPicker] = useState(false);
  const [showToTokenPicker, setShowToTokenPicker] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [history, setHistory] = useState([]);
  console.log("🚀 ~ TokenSwapScreen ~ history:", history);

  // const { isConnected } = useWallet();
  const isConnected = true;
  const address = userInfo?.address;

  const fetchAuthDetails = async () => {
    try {
      const auth_token = await AsyncStorage.getItem("auth_token");
      setAuthToken(auth_token);

      if (!auth_token) {
        navigation.navigate("login");
      } else {
        const userData = await getUserInfo();
        setUserInfo(userData);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Auth",
        text2: "Error in fetching auth details"
      });
    }
  };

  const getSwapHistory = async () => {
    try {
      const historyData = await TokenSwapListApi();
      console.log("🚀 ~ getSwapHistory ~ historyData:", historyData);
      setHistory(historyData?.data);
    } catch (err) {
      console.log("error:", err);
    }
  };

  useState(() => {
    if (address) {
      getSwapHistory();
    }
  }, [address]);

  const transactions = [
    {
      id: 1,
      amount: "500 $PMT → 0.01 ETH",
      date: "31 Mar 2025, 14:30",
      status: "success",
      statusColor: "#22C55E"
    },
    {
      id: 2,
      amount: "600 $PMT → 0.012 ETH",
      date: "01 Apr 2025, 09:00",
      status: "in_progress",
      statusColor: "#F59E0B"
    },
    {
      id: 3,
      amount: "700 $PMT → 0.015 ETH",
      date: "02 Apr 2025, 11:15",
      status: "success",
      statusColor: "#22C55E"
    },
    {
      id: 4,
      amount: "800 $PMT → 0.018 ETH",
      date: "03 Apr 2025, 16:45",
      status: "in_progress",
      statusColor: "#F59E0B"
    },
    {
      id: 5,
      amount: "900 $PMT → 0.02 ETH",
      date: "04 Apr 2025, 13:30",
      status: "success",
      statusColor: "#22C55E"
    },
    {
      id: 6,
      amount: "1000 $PMT → 0.025 ETH",
      date: "05 Apr 2025, 10:00",
      status: "rejected",
      statusColor: "#EF4444"
    },
    {
      id: 7,
      amount: "1100 $PMT → 0.03 ETH",
      date: "06 Apr 2025, 12:00",
      status: "rejected",
      statusColor: "#EF4444"
    },
    {
      id: 8,
      amount: "900 $PMT → 0.02 ETH",
      date: "04 Apr 2025, 13:30",
      status: "success",
      statusColor: "#22C55E"
    }
  ];

  // Balance states
  const [pmtBalance, setPMTBalance] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [usdtBalance, setUsdtBalance] = useState(null);
  const [daiBalance, setDaiBalance] = useState(null);
  const [bnbBalance, setBnbBalance] = useState(null);
  const [wbnbBalance, setWbnbBalance] = useState(null);
  const [tBnbBalance, setTBNBBalance] = useState(null);

  const WBNB_TESTNET = REACT_NATIVE_WBNB_TESTNET;
  const USDT_TESTNET = REACT_NATIVE_USDT_TESTNET;
  const PMT_TESTNET = REACT_NATIVE_PMT_TESTNET;
  const DAI_TESTNET = REACT_NATIVE_DAI_TESTNET;
  const ETH_TESTNET = REACT_NATIVE_ETH_TESTNET;
  const TBNB_TESTNET = REACT_NATIVE_TBNB_TESTNET;
  const MATIC_TESTNET = REACT_NATIVE_MATIC_TESTNET;
  const LINK_TESTNET = REACT_NATIVE_LINK_TESTNET;

  const balanceList = [
    {
      name: "PMT",
      value: pmtBalance ? parseFloat(pmtBalance) : 0,
      usdtValueCheck: "0.65",
      testnet_address: PMT_TESTNET
    },
    {
      name: "ETH",
      value: ethBalance ? parseFloat(ethBalance) : 0,
      usdtValueCheck: "1,559.65",
      testnet_address: ETH_TESTNET
    },
    {
      name: "WBNB",
      value: wbnbBalance ? parseFloat(wbnbBalance) : 0,
      usdtValueCheck: "0.65",
      testnet_address: WBNB_TESTNET
    },
    {
      name: "USDT",
      value: usdtBalance ? parseFloat(usdtBalance) : 0,
      usdtValueCheck: "1,559.65",
      testnet_address: USDT_TESTNET
    },
    {
      name: "DAI",
      value: daiBalance ? parseFloat(daiBalance) : 0,
      usdtValueCheck: "0.65",
      testnet_address: DAI_TESTNET
    },
    {
      name: "tBNB",
      value: bnbBalance ? parseFloat(bnbBalance) : 0,
      usdtValueCheck: "0.65",
      testnet_address: TBNB_TESTNET
    },
    {
      name: "MATIC",
      value: 0,
      usdtValueCheck: "0.65",
      testnet_address: MATIC_TESTNET
    },
    {
      name: "LINK",
      value: 0,
      usdtValueCheck: "0.65",
      testnet_address: LINK_TESTNET
    }
  ];

  // Helper functions
  const selectedTokenSymbol = tokenList.find(
    (item) => item.id === Number(selectedToken)
  )?.name;

  const selectedTokenToSymbol = tokenList.find(
    (item) => item.id === Number(selectedTokenTo)
  )?.name;

  const selectedTokenBalance =
    balanceList.find((item) => item.name === selectedTokenSymbol)?.value || 0;

  const selectedTokenToBalance =
    balanceList.find((item) => item.name === selectedTokenToSymbol)?.value || 0;

  const selectedTokenAddress = balanceList.find(
    (item) => item.name === selectedTokenSymbol
  )?.testnet_address;

  const selectedTokenToAddress = balanceList.find(
    (item) => item.name === selectedTokenToSymbol
  )?.testnet_address;

  const disableStatus =
    !userInput || Number(userInput) <= 0 || userInput > selectedTokenBalance;

  // Effects
  useEffect(() => {
    const fetchRate = async () => {
      if (!userInput || !selectedTokenAddress || !selectedTokenToAddress)
        return;

      try {
        const result = await getAmountsOut(
          userInput,
          selectedTokenAddress,
          selectedTokenToAddress
        );
        setConvertedAmount(result);
      } catch (err) {
        console.error("Error fetching conversion rate:", err);
        setConvertedAmount("0");
      }
    };

    fetchRate();
  }, [userInput, selectedTokenAddress, selectedTokenToAddress]);

  useEffect(() => {
    // Your balance fetching logic here
    // This will need to be adapted for React Native
    getPMTBalance();
  }, []);

  // Event handlers
  const handleInputChange = (value) => {
    const regex = /^\d*\.?\d*$/;
    if (!regex.test(value)) return;

    const numericValue = parseFloat(value);
    if (numericValue > selectedTokenBalance) {
      setUserInput("");
      Alert.alert(
        "Exceeds available balance",
        `You only have ${selectedTokenBalance} ${selectedTokenSymbol}`
      );
      return;
    }

    setUserInput(value);
  };

  const swapField = () => {
    const temp = selectedTokenTo;
    setSelectedToken(temp);
    setSelectedTokenTo(selectedToken);
    setStatus("");
    if (selectedTokenBalance > userInput) {
      setUserInput("");
      setConvertedAmount(0);
    }
  };

  const handleSwap = async () => {
    try {
      const result = await swapTokens(
        userInput,
        selectedTokenAddress,
        selectedTokenToAddress,
        setStatus,
        setTransactionHash,
        setBlockNumber
      );

      if (result?.success === 200) {
        const updatedData = {
          from_token: selectedTokenAddress,
          to_token: selectedTokenToAddress,
          from_amount: userInput,
          to_amount: convertedAmount,
          swap_rate: 0.01
        };
        const response = await TokenSwapApi(updatedData, authToken);
        if (response?.data?.success) {
          Alert.alert("Success", "Tokens swapped successfully!");
        } else {
          setStatus("Failed");
          Alert.alert("Error", "An error occurred during the swap.");
        }
      }
    } catch (error) {
      setStatus("Failed");
      Alert.alert("Error", "An error occurred during the swap.");
    }
  };

  const getPMTBalance = async () => {
    if (!isConnected || !address) {
      Alert.alert("Connect Wallet", "Please connect your wallet.");
      return false;
    }
    // Implement balance fetching logic for React Native
    // This will depend on your wallet integration
  };

  const renderTokenPicker = (isFromToken) => {
    // const currentValue = isFromToken ? selectedToken : selectedTokenTo;
    const setCurrentValue = isFromToken ? setSelectedToken : setSelectedTokenTo;
    const setModalVisible = isFromToken
      ? setShowFromTokenPicker
      : setShowToTokenPicker;
    const otherValue = isFromToken ? selectedTokenTo : selectedToken;

    return (
      <FlatList
        data={tokenList.filter((token) => token.id !== otherValue)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tokenPickerItem}
            onPress={() => {
              setCurrentValue(item.id);
              setModalVisible(false);
              setUserInput("");
            }}
          >
            <Image source={item.avatar} style={styles.tokenImage} />
            <Text style={styles.tokenName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const SwapIcon = () => (
    <View style={styles.swapIconContainer}>
      <Text style={styles.swapIcon}>⇅</Text>
    </View>
  );

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.swapContainer}>
            {/* From Token Section */}
            <View style={styles.tokenSection}>
              <View style={styles.tokenRow}>
                <TouchableOpacity
                  style={styles.tokenSelector}
                  onPress={() => setShowFromTokenPicker(true)}
                >
                  <Image
                    source={
                      tokenList.find((t) => t.id === selectedToken)?.avatar
                    }
                    style={styles.tokenSelectorImage}
                  />
                  <Text style={styles.tokenSelectorText}>
                    {selectedTokenSymbol}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.amountInput}
                  value={userInput}
                  onChangeText={handleInputChange}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#717A8C"
                />
              </View>

              <View style={styles.balanceRow}>
                <Text style={styles.balanceText}>
                  Balance: {formatBalance(selectedTokenBalance)}{" "}
                  {selectedTokenSymbol}
                </Text>
              </View>
            </View>

            {/* Swap Button */}
            <TouchableOpacity style={styles.swapButton} onPress={swapField}>
              <SwapIcon />
            </TouchableOpacity>

            <View style={styles.tokenSection}>
              <View style={styles.tokenRow}>
                <TouchableOpacity
                  style={styles.tokenSelector}
                  onPress={() => setShowToTokenPicker(true)}
                >
                  <Image
                    source={
                      tokenList.find((t) => t.id === selectedTokenTo)?.avatar
                    }
                    style={styles.tokenSelectorImage}
                  />
                  <Text style={styles.tokenSelectorText}>
                    {selectedTokenToSymbol}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>

                <TextInput
                  style={[styles.amountInput, styles.readOnlyInput]}
                  value={formatBalance(convertedAmount)}
                  editable={false}
                  placeholder={`Value in ${selectedTokenToSymbol}`}
                  placeholderTextColor="#717A8C"
                />
              </View>

              <View style={styles.balanceRow}>
                <Text style={styles.balanceText}>
                  Balance: {formatBalance(selectedTokenToBalance)}{" "}
                  {selectedTokenToSymbol}
                </Text>
              </View>
            </View>

            {userInput && (
              <View style={styles.conversionRate}>
                <Text style={styles.conversionText}>
                  {userInput} {selectedTokenSymbol} ={" "}
                  {formatBalance(convertedAmount)} {selectedTokenToSymbol}
                </Text>
              </View>
            )}

            {status && (
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>
                  {status} {selectedTokenSymbol} to{" "}
                  {formatBalance(convertedAmount)} {selectedTokenToSymbol}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.executeSwapButton,
                disableStatus && styles.disabledButton
              ]}
              onPress={handleSwap}
              disabled={disableStatus}
            >
              <Text
                style={[
                  styles.executeSwapText,
                  disableStatus && styles.disabledButtonText
                ]}
              >
                Swap
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>TRANSACTION HISTORY</Text>

            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionAmount}>
                    {transaction.amount}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <View style={[styles.statusBadge]}>
                  <Image
                    source={
                      transaction.status === "success"
                        ? SuccessLogo
                        : transaction.status === "in_progress"
                        ? WarningLogo
                        : CancelLogo
                    }
                    style={styles.statusLogo}
                  />
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          transaction.status === "success"
                            ? "#1FEF68"
                            : transaction.status === "in_progress"
                            ? "#B49B16"
                            : "#FA1A09"
                      }
                    ]}
                  >
                    {transaction.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <Modal
            visible={showFromTokenPicker}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowFromTokenPicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Token</Text>
                  <TouchableOpacity
                    onPress={() => setShowFromTokenPicker(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                {renderTokenPicker(true)}
              </View>
            </View>
          </Modal>

          {/* To Token Picker Modal */}
          <Modal
            visible={showToTokenPicker}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowToTokenPicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Token</Text>
                  <TouchableOpacity
                    onPress={() => setShowToTokenPicker(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                {renderTokenPicker(false)}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  content: {
    flex: 1,
    padding: 16
  },
  swapContainer: {
    padding: 16,
    marginBottom: 24
  },
  tokenSection: {
    backgroundColor: "#EBEBEB",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8
  },
  tokenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 12
  },
  tokenSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 120
  },
  tokenSelectorImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    objectFit: "contain"
  },
  tokenSelectorText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    marginRight: 8
  },
  dropdownArrow: {
    color: "#ffffff",
    fontSize: 10
  },
  amountInput: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#717A8C",
    paddingVertical: 8
  },
  readOnlyInput: {
    color: "#717A8C"
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  balanceText: {
    fontSize: 12,
    color: "#717A8C"
  },
  swapButton: {
    alignSelf: "center",
    zIndex: 1,
    marginVertical: -20
  },
  swapIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000000",
    borderWidth: 4,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  },
  swapIcon: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold"
  },
  conversionRate: {
    alignItems: "flex-end",
    marginTop: 12
  },
  conversionText: {
    fontSize: 12,
    color: "#717A8C"
  },
  statusContainer: {
    alignItems: "flex-end",
    marginTop: 8
  },
  statusText: {
    fontSize: 12,
    color: "#717A8C"
  },
  executeSwapButton: {
    backgroundColor: "#FFE501",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16
  },
  disabledButton: {
    backgroundColor: "#C0C0C0"
  },
  executeSwapText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500"
  },
  disabledButtonText: {
    color: "#ffffff"
  },
  historySection: {
    maxWidth: 400,
    alignSelf: "center",
    padding: 16,
    marginTop: 32
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 24
  },
  historyContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 16
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#E6E6E6",
    padding: 6,
    marginBottom: 8,
    borderRadius: 8
  },
  transactionInfo: {
    flex: 1
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4
  },
  transactionDate: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400"
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row"
  },
  statusLogo: {
    width: 20,
    height: 20,
    marginRight: 2
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF"
  },
  noHistoryText: {
    fontSize: 16,
    color: "#717A8C"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    width: width * 0.8,
    maxHeight: 400
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000"
  },
  closeButton: {
    padding: 8
  },
  closeButtonText: {
    fontSize: 18,
    color: "#717A8C"
  },
  tokenPickerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  tokenImage: {
    width: 32,
    height: 32,
    marginRight: 12,
    objectFit: "contain"
  },
  tokenName: {
    fontSize: 16,
    color: "#000000"
  }
});

export default TokenSwapScreen;
