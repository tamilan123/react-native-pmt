import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";
import ScreenLayout from "../screen-layout/screenLayout";
import SuccessLogo from "../../assets/images/footer/check_circle.png";
import WarningLogo from "../../assets/images/footer/Warning.png";
import CancelLogo from "../../assets/images/footer/cancel.png";

const TokenSwapScreen = () => {
  const [fromAmount, setFromAmount] = useState("0.00");
  const [toAmount, setToAmount] = useState("0.00");

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

  const handleSwapTokens = () => {
    // Toggle token positions
    console.log("Swap tokens");
  };

  const handleSwap = () => {
    console.log("Execute swap");
  };

  return (
    <ScreenLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Swap Container */}
          <View style={styles.swapContainer}>
            {/* From Token */}
            <View style={styles.tokenContainer}>
              <View style={styles.tokenSelector}>
                <View style={styles.tokenInfo}>
                  <View style={styles.tokenIcon}>
                    <Text style={styles.tokenIconText}>PMT</Text>
                  </View>
                  <Text style={styles.tokenSymbol}>PMT</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </View>
                <TextInput
                  style={styles.amountInput}
                  value={fromAmount}
                  onChangeText={setFromAmount}
                  placeholder="0.00"
                  placeholderTextColor="#717A8C"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceText}>Balance: 2.8989 PMT</Text>
                <Text style={styles.usdValue}>≈$ 6726.2307</Text>
              </View>
            </View>

            {/* Swap Button */}
            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwapTokens}
            >
              <View style={styles.swapIcon}>
                <Text style={styles.swapIconText}>⇅</Text>
              </View>
            </TouchableOpacity>

            {/* To Token */}
            <View style={styles.tokenContainer}>
              <View style={styles.tokenSelector}>
                <View style={styles.tokenInfo}>
                  <View style={[styles.tokenIcon, styles.ethIcon]}>
                    <Text style={styles.tokenIconText}>ETH</Text>
                  </View>
                  <Text style={styles.tokenSymbol}>ETH</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </View>
                <TextInput
                  style={styles.amountInput}
                  value={toAmount}
                  onChangeText={setToAmount}
                  placeholder="0.00"
                  placeholderTextColor="#717A8C"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceText}>Balance: 400.8889 ETH</Text>
                <Text style={styles.usdValue}>≈$ 284.6392</Text>
              </View>
              <Text style={styles.conversionRate}>1 ETH = 0.0003064ETH</Text>
            </View>

            {/* Main Swap Button */}
            <TouchableOpacity
              style={styles.mainSwapButton}
              onPress={handleSwap}
            >
              <Text style={styles.mainSwapButtonText}>Swap</Text>
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
  header: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  },
  content: {
    flex: 1,
    padding: 16
  },
  swapContainer: {
    // backgroundColor: "#E5E5E5",
    // borderRadius: 12,
    padding: 16,
    marginBottom: 24
  },
  tokenContainer: {
    marginBottom: 16,
    backgroundColor: "#EBEBEB",
    borderRadius: 12,
    padding: 16
  },
  tokenSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  tokenInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  tokenIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },
  ethIcon: {
    backgroundColor: "#627EEA"
  },
  tokenIconText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000"
  },
  statusLogo: {
    width: 20,
    height: 20,
    marginRight: 2
  },
  tokenSymbol: {
    color: "#FFFFFF",
    fontWeight: "400",
    marginRight: 8
  },
  dropdownArrow: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "400"
  },
  amountInput: {
    fontSize: 24,
    fontWeight: "400",
    color: "#717A8C",
    textAlign: "right",
    minWidth: 100
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  balanceText: {
    fontSize: 14,
    color: "#666"
  },
  usdValue: {
    fontSize: 14,
    color: "#666"
  },
  conversionRate: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4
  },
  swapButton: {
    alignSelf: "center",
    marginVertical: 8
  },
  swapIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -30,
    left: 10,
    zIndex: 10
  },
  swapIconText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  mainSwapButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    borderColor: "#000",
    borderWidth: 0.5
  },
  mainSwapButtonText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#000"
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
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF"
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8
  },
  activeNavItem: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderRadius: 8
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4
  },
  navText: {
    fontSize: 12,
    color: "#999"
  },
  activeNavText: {
    color: "#FFD700",
    fontWeight: "bold"
  }
});

export default TokenSwapScreen;
