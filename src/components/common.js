import { ethers } from "ethers";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import pmtABI from "../abi/pmt-abi.json";
import nftABI from "../abi/nft-abi.json";
import stakingABI from "../abi/shared-abi.json";
import { useWallet } from "../../utils/walletContext";

export const formatWalletAddress = (walletAddress) => {
  if (walletAddress) {
    const firstPart = walletAddress.slice(0, 4);
    const lastPart = walletAddress.slice(-4);
    return `${firstPart}.......${lastPart}`;
  } else {
    return "--";
  }
};

export const formatNumber = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    return "0";
  }

  const absNumber = Math.abs(number);
  const sign = number < 0 ? "-" : "";

  if (absNumber >= 1_000_000_000) {
    return (
      sign + (absNumber / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"
    );
  } else if (absNumber >= 1_000_000) {
    return sign + (absNumber / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (absNumber >= 1_000) {
    return sign + (absNumber / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return sign + absNumber.toString();
  }
};

export const handleInitPmtStake = async ({
  stakingAmount,
  selectedPlan,
  address,
  setIsStaking
  // signer
}) => {
  if (!stakingAmount || !selectedPlan) {
    Toast.show({
      type: "info",
      text1: "Invalid Input",
      text2: "Please enter a valid staking amount"
    });

    return;
  }

  setIsStaking(true);

  try {
    if (!signer || !address) {
      Alert.alert("Wallet Not Connected", "Please connect your wallet first.");
      return;
    }

    const stakingABI = [
      "function stake(uint256 amount, uint256 level) external returns (bool)",
      "function claimRewards(uint256 level) external returns (bool)",
      "function withdraw(uint256 level) external returns (bool)",
      "function recoverToken(address to, uint256 amount) external",
      "function emergencyWithdraw(uint256 level) external returns (uint256)"
    ];

    // Contracts
    const stakingContract = new ethers.Contract(
      PMT_STAKING_CONTRACT_ADDRESS,
      stakingABI,
      signer
    );

    const pmtContract = new ethers.Contract(
      PMT_TOKEN_CONTRACT_ADDRESS,
      pmtABI,
      signer
    );

    // Get balance and decimals
    const balance = await pmtContract.balanceOf(address);
    const decimals = await pmtContract.decimals();
    const formattedBalance = ethers.formatUnits(balance, decimals);
    const rawStakingAmount = ethers.parseUnits(stakingAmount, decimals);

    if (balance.lt(rawStakingAmount)) {
      Alert.alert(
        "Insufficient Balance",
        `You need ${stakingAmount} PMT but only have ${formattedBalance} PMT.`
      );
      return;
    }

    // Check allowance
    const currentAllowance = await pmtContract.allowance(
      address,
      PMT_STAKING_CONTRACT_ADDRESS
    );

    if (currentAllowance.lt(rawStakingAmount)) {
      const approveTx = await pmtContract.approve(
        PMT_STAKING_CONTRACT_ADDRESS,
        rawStakingAmount
      );
      await approveTx.wait();
    }

    // Stake
    const stakeTx = await stakingContract.stake(
      rawStakingAmount,
      selectedPlan.id
    );
    console.log("🚀 ~ handleInitPmtStake ~ stakeTx:", stakeTx);
    const receipt = await stakeTx.wait();

    if (receipt?.status === 1) {
      const data = {
        method: "token_stake",
        data: {
          plan: selectedPlan?.id,
          amount: stakingAmount,
          number_of_days: selectedPlan?.duration,
          hash: stakeTx?.hash
        }
      };
      handleUpdateTokenStaking(data);

      Alert.alert("Success", "Staking completed successfully.");
      // setStakingAmount("");
      setModalVisible(false);
    } else {
      throw new Error("Staking transaction failed.");
    }
  } catch (error) {
    console.error("Staking Error:", error);
    Alert.alert("Staking Error", error?.message || "Something went wrong");
  } finally {
    setIsStaking(false);
  }
};

export const handleNftStaking = async (plan, address) => {
  const nftAddress = plan?.address;
  const tokenId = plan?.token;
  try {
    Toast.show({ type: "info", text1: "Processing NFT Staking..." });

    // const walletClient = getWalletClient();
    if (!walletClient) {
      Alert.alert("Wallet Error", "WalletConnect is not initialized.");
      return;
    }

    const { connectWallet, signer } = useWallet();

    const provider = new ethers.providers.Web3Provider(walletClient);
    // const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      nftABI,
      signer
    );
    const stakingContract = new ethers.Contract(
      STAKING_CONTRACT_ADDRESS,
      stakingABI,
      signer
    );

    let tokenOwner;
    try {
      tokenOwner = await nftContract.ownerOf(tokenId);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Invalid NFT",
        text2: "NFT not minted or doesn't exist"
      });
      return;
    }

    if (tokenOwner.toLowerCase() !== address.toLowerCase()) {
      Toast.show({
        type: "error",
        text1: "Not Owner",
        text2: "You do not own this NFT"
      });
      return;
    }

    const approvedAddress = await nftContract.getApproved(tokenId);
    const isApproved =
      approvedAddress.toLowerCase() === STAKING_CONTRACT_ADDRESS.toLowerCase();

    if (!isApproved) {
      const approvalTx = await nftContract.approve(
        STAKING_CONTRACT_ADDRESS,
        tokenId
      );
      await approvalTx.wait();

      Toast.show({
        type: "success",
        text1: "Approved",
        text2: "NFT approved for staking"
      });
    }

    // ✅ Step 3: Stake NFT
    const stakeTx = await stakingContract.stake([tokenId]);
    await stakeTx.wait();

    Toast.show({
      type: "success",
      text1: "NFT Staked",
      text2: `Staked token #${tokenId}`
    });

    // Update your backend
    updateStakingApi({
      method: "stake",
      collectionId: tokenId,
      hash: stakeTx?.hash
    });
  } catch (err) {
    console.error("NFT Staking Error:", err);
    Alert.alert("Error", err?.message || "Failed to stake NFT");
  }
};
