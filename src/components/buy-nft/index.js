import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { ethers, formatUnits, parseUnits } from "ethers";

import ApprovePlatformInteraction from "../../utils/platformInteraction";
import { buyAsset } from "../../utils/buyAsset";
import { useWallet } from "../../context/WalletContext";

const BuyNFTPopup = ({
  isOpen,
  onClose,
  nftAddress,
  erc20PMTAddress,
  tradeContractAddress,
  transferProxyAddress,
  web3Data,
  onOpenChange = () => {},
  metadata,
  item,
  fetchNftData = () => {}
}) => {
  const PMT_TOKEN_ADDRESS = process.env.REACT_APP_PMT_TOKEN_ADDRESS;

  const { isConnected, address } = useWallet();
  const [buyQuantity, setBuyQuantity] = useState("1");
  const [step, setStep] = useState(1);
  const [approvalStatus, setApprovalStatus] = useState("yetToStart");
  const [buyStatus, setBuyStatus] = useState("yetToStart");
  const [formattedBalance, setFormattedBalance] = useState(null);

  const collection_type = item?.data?.collection?.collection_type;
  const buyPrice = item?.data?.collection?.instant_sale_price;
  const resale_price = item?.data?.collection?.resale_price;

  const collectionId = item?.data?.collection?.address;

  const unitPrice = resale_price
    ? parseUnits(resale_price?.toString(), 18)
    : parseUnits(buyPrice?.toString(), 18);

  const formattedUnitPrice = parseFloat(formatUnits(unitPrice, 18));
  const buyerFee = (formattedUnitPrice * 2) / 100;
  const formattedTotalPrice = formattedUnitPrice + buyerFee;
  const formattedTotalValue = parseUnits(formattedTotalPrice.toString(), 18);

  useEffect(() => {
    const ERC20_ABI = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)"
    ];
    const setPMTBalance = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          PMT_TOKEN_ADDRESS,
          ERC20_ABI,
          provider
        );
        const balance = await contract.balanceOf(address);
        const decimals = await contract.decimals();
        const formatted = parseFloat(formatUnits(balance, decimals));
        setFormattedBalance(formatted);
      } catch (err) {
        console.error("Error fetching PMT balance:", err);
      }
    };
    if (isConnected && address) setPMTBalance();
  }, [PMT_TOKEN_ADDRESS, address, isConnected]);

  useEffect(() => {
    if (approvalStatus === "done" && buyStatus === "yetToStart") {
      setTimeout(() => {
        initPurchaseProcess();
      }, 1000);
    }
  }, [approvalStatus, buyStatus]);

  const showToast = (title, description, type = "info") => {
    Toast.show({
      type,
      text1: title,
      text2: description
    });
  };

  const checkPMTToken = async () => {
    if (!isConnected || !address) {
      showToast(
        "Connect Wallet",
        "Please connect your wallet to continue.",
        "info"
      );
      return false;
    }

    try {
      if (formattedBalance < formattedTotalPrice) {
        showToast(
          "Insufficient PMT",
          "You need more PMT tokens to buy.",
          "error"
        );
        return false;
      }
      return true;
    } catch (err) {
      console.error("Error checking PMT token:", err);
      showToast(
        "Token Check Failed",
        "Could not verify PMT token balance.",
        "error"
      );
      return false;
    }
  };

  const checkAndProcess = async () => {
    const hasPMT = await checkPMTToken();
    if (hasPMT) {
      ApprovePlatformInteraction(
        erc20PMTAddress,
        transferProxyAddress,
        formattedTotalValue,
        web3Data,
        setApprovalStatus
      );
    }
  };

  const initPurchaseProcess = async () => {
    try {
      const result = await buyAsset({
        tradeContractAddress,
        web3Data,
        collectionId,
        erc20PMTAddress,
        buyQuantity,
        metadata,
        nftAddress,
        item,
        setBuyStatus
      });

      if (result?.success === false) {
        console.log(result.error);
      } else {
        showToast(
          "Purchase Successful!",
          "NFT Purchase Successful!",
          "success"
        );
        fetchNftData();
        onClose();
      }
    } catch (error) {
      showToast(
        "Purchase Failed",
        `Purchase Failed: ${error.message}`,
        "error"
      );
    }
  };

  const handleApproval = () => {
    setStep(2);
    checkAndProcess();
  };

  return (
    <>
      <Modal isVisible={isOpen} onBackdropPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {step === 1 ? "Checkout" : "Follow Steps"}
          </Text>
          {step === 1 && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={buyQuantity}
                onChangeText={(val) => {
                  const value =
                    val === "" || Number(val) < 1
                      ? "1"
                      : Number(val) > 10
                      ? "10"
                      : val;
                  setBuyQuantity(value);
                }}
                editable={collection_type !== "single"}
              />
              <Text style={styles.text}>
                Wallet Balance: {formattedBalance || "0"} PMT
              </Text>
              <Text style={styles.text}>
                Buy Price: {buyQuantity * buyPrice}
              </Text>
              <Text style={styles.text}>
                Service Fee: {buyerFee.toFixed(4)}
              </Text>
              <Text style={styles.text}>
                You will pay: {(buyQuantity * buyPrice + buyerFee).toFixed(4)}
              </Text>
              <Button title="Continue" onPress={handleApproval} />
            </>
          )}
          {step === 2 && (
            <View>
              <Text style={styles.text}>
                {approvalStatus === "done"
                  ? "✅ Approval Complete"
                  : "⏳ Approving..."}
              </Text>
              <Text style={styles.text}>
                {buyStatus === "done"
                  ? "✅ Purchase Complete"
                  : "⏳ Purchasing..."}
              </Text>
            </View>
          )}
        </View>
      </Modal>
      <Toast />
    </>
  );
};

export default BuyNFTPopup;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  text: {
    marginBottom: 10
  }
});
