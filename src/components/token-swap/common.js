import { ethers } from "ethers";
import { Alert } from "react-native";
import { REACT_NATIVE_TESTNET_ROUTER_ADDRESS } from "@env"; // or hardcode address

const ABI = [
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)"
];

import Config from "react-native-config";

/**
 * Swap tokens function adapted for React Native
 * @param {string} amount - Amount to swap
 * @param {string} fromToken - Source token address
 * @param {string} toToken - Destination token address
 * @param {function} setStatus - Status callback function
 * @param {function} setTransactionHash - Transaction hash callback
 * @param {function} setBlockNumber - Block number callback
 * @param {object} provider - Wallet provider (from WalletConnect or similar)
 * @returns {Promise<object>} - Transaction result
 */
const swapTokens = async (
  amount = "0",
  fromToken,
  toToken,
  setStatus = () => {},
  setTransactionHash = () => {},
  setBlockNumber = () => {},
  provider = null // Provider needs to be passed in React Native
) => {
  try {
    // Validate inputs
    if (!provider) {
      throw new Error("Wallet provider is required");
    }

    if (!fromToken || !toToken) {
      throw new Error("Token addresses are required");
    }

    if (!amount || parseFloat(amount) <= 0) {
      throw new Error("Valid amount is required");
    }

    // Environment variables for React Native
    const REACT_NATIVE_TESTNET_ROUTER_ADDRESS =
      Config.REACT_NATIVE_TESTNET_ROUTER_ADDRESS;
    const WBNB_TESTNET = Config.WBNB_TESTNET?.toLowerCase();

    if (!REACT_NATIVE_TESTNET_ROUTER_ADDRESS || !WBNB_TESTNET) {
      throw new Error("Router or WBNB address not configured");
    }

    // Contract ABIs
    const ROUTER_ABI = [
      "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable external returns (uint[] memory amounts)",
      "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
    ];

    const ERC20_ABI = [
      "function approve(address spender, uint amount) external returns (bool)",
      "function allowance(address owner, address spender) view returns (uint256)",
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() view returns (uint8)"
    ];

    // Create ethers provider from the wallet provider
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const userAddress = await signer.getAddress();

    // Create router contract instance
    const router = new ethers.Contract(
      REACT_NATIVE_TESTNET_ROUTER_ADDRESS,
      ROUTER_ABI,
      signer
    );

    // Prepare swap parameters
    const amountIn = ethers.utils.parseUnits(amount, 18);
    const path = [fromToken, toToken];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
    const gasLimit = 300000;

    // Get expected output amount
    const expectedOut = await getAmountsOut(amount, fromToken, toToken);
    const bigIntValue = ethers.utils.parseUnits(expectedOut, 18);

    // Calculate slippage
    const slippagePercent = 5;
    const slippage = slippagePercent / 100;
    const amountOutMin = Number(expectedOut) * (1 - slippage);
    const rawValue = amountOutMin.toFixed(18);
    const formattedAmountOutMin = ethers.utils.parseUnits(
      rawValue.toString(),
      18
    );

    setStatus("🔄 Preparing swap...");

    // Handle different swap scenarios
    let tx;

    // Case 1: Swapping from WBNB to other token
    if (fromToken.toLowerCase() === WBNB_TESTNET) {
      try {
        tx = await router.swapExactETHForTokens(
          formattedAmountOutMin,
          path,
          userAddress,
          deadline,
          {
            value: amountIn,
            gasLimit: gasLimit
          }
        );
      } catch (error) {
        console.error("Error swapping ETH for tokens:", error);
        throw error;
      }
    }
    // Case 2: Swapping to WBNB
    else if (toToken.toLowerCase() === WBNB_TESTNET) {
      const tokenContract = new ethers.Contract(fromToken, ERC20_ABI, signer);

      // Check and approve if necessary
      const allowance = await tokenContract.allowance(
        userAddress,
        REACT_NATIVE_TESTNET_ROUTER_ADDRESS
      );

      if (allowance.lt(amountIn)) {
        setStatus("🔐 Approving token...");
        const approveTx = await tokenContract.approve(
          REACT_NATIVE_TESTNET_ROUTER_ADDRESS,
          amountIn
        );
        await approveTx.wait();
      }

      tx = await router.swapExactTokensForETH(
        amountIn,
        formattedAmountOutMin,
        path,
        userAddress,
        deadline,
        { gasLimit: gasLimit }
      );
    }
    // Case 3: Token to token swap
    else {
      const tokenContract = new ethers.Contract(fromToken, ERC20_ABI, signer);

      // Check and approve if necessary
      const allowance = await tokenContract.allowance(
        userAddress,
        REACT_NATIVE_TESTNET_ROUTER_ADDRESS
      );

      if (allowance.lt(amountIn)) {
        setStatus("🔐 Approving token...");
        const approveTx = await tokenContract.approve(
          REACT_NATIVE_TESTNET_ROUTER_ADDRESS,
          amountIn
        );
        await approveTx.wait();
      }

      tx = await router.swapExactTokensForTokens(
        amountIn,
        formattedAmountOutMin,
        path,
        userAddress,
        deadline,
        { gasLimit: gasLimit }
      );
    }

    setStatus("⏳ Waiting for confirmation...");

    // Wait for transaction confirmation
    const receipt = await tx.wait();

    // Update status and return success
    setTransactionHash(tx.hash);
    setBlockNumber(receipt.blockNumber);
    setStatus(`✅ Swapped ${amount} tokens successfully`);

    // Show success alert
    Alert.alert(
      "Swap Successful",
      `Successfully swapped ${amount} tokens!\nTransaction Hash: ${tx.hash}`,
      [{ text: "OK" }]
    );

    return {
      success: 200,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      receipt: receipt
    };
  } catch (error) {
    console.error("Swap error:", error);

    // Extract error message
    let errorMessage = "Unknown error occurred";

    if (error.reason) {
      errorMessage = error.reason;
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    // Update status
    setStatus("❌ Transaction failed");

    // Show error alert
    Alert.alert("Transaction Failed", `Transaction Failed: ${errorMessage}`, [
      { text: "OK" }
    ]);

    // Return error result
    return {
      success: 400,
      error: errorMessage,
      originalError: error
    };
  }
};

/**
 * Helper function to validate swap parameters
 * @param {string} amount - Amount to swap
 * @param {string} fromToken - Source token address
 * @param {string} toToken - Destination token address
 * @returns {object} - Validation result
 */
export const validateSwapParams = (amount, fromToken, toToken) => {
  const errors = [];

  if (!amount || parseFloat(amount) <= 0) {
    errors.push("Please enter a valid amount");
  }

  if (!fromToken || !ethers.utils.isAddress(fromToken)) {
    errors.push("Invalid source token address");
  }

  if (!toToken || !ethers.utils.isAddress(toToken)) {
    errors.push("Invalid destination token address");
  }

  if (
    fromToken &&
    toToken &&
    fromToken.toLowerCase() === toToken.toLowerCase()
  ) {
    errors.push("Source and destination tokens cannot be the same");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Helper function to estimate gas for swap
 * @param {string} amount - Amount to swap
 * @param {string} fromToken - Source token address
 * @param {string} toToken - Destination token address
 * @param {object} provider - Wallet provider
 * @returns {Promise<string>} - Estimated gas
 */
export const estimateSwapGas = async (amount, fromToken, toToken, provider) => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const userAddress = await signer.getAddress();

    const REACT_NATIVE_TESTNET_ROUTER_ADDRESS =
      Config.REACT_NATIVE_TESTNET_ROUTER_ADDRESS;
    const WBNB_TESTNET = Config.WBNB_TESTNET?.toLowerCase();

    const ROUTER_ABI = [
      "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable external returns (uint[] memory amounts)",
      "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
    ];

    const router = new ethers.Contract(
      REACT_NATIVE_TESTNET_ROUTER_ADDRESS,
      ROUTER_ABI,
      signer
    );

    const amountIn = ethers.utils.parseUnits(amount, 18);
    const path = [fromToken, toToken];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const amountOutMin = ethers.utils.parseUnits("0", 18); // Minimum for estimation

    let estimatedGas;

    if (fromToken.toLowerCase() === WBNB_TESTNET) {
      estimatedGas = await router.estimateGas.swapExactETHForTokens(
        amountOutMin,
        path,
        userAddress,
        deadline,
        { value: amountIn }
      );
    } else if (toToken.toLowerCase() === WBNB_TESTNET) {
      estimatedGas = await router.estimateGas.swapExactTokensForETH(
        amountIn,
        amountOutMin,
        path,
        userAddress,
        deadline
      );
    } else {
      estimatedGas = await router.estimateGas.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        path,
        userAddress,
        deadline
      );
    }

    return ethers.utils.formatUnits(estimatedGas, "wei");
  } catch (error) {
    console.error("Gas estimation error:", error);
    return "300000"; // Default gas limit
  }
};

export default swapTokens;

export const getAmountsOut = async (
  amountIn,
  fromToken,
  toToken,
  decimals = 18,
  signer
) => {
  try {
    if (!REACT_NATIVE_TESTNET_ROUTER_ADDRESS) {
      throw new Error("Router address not defined.");
    }

    const router = new ethers.Contract(
      REACT_NATIVE_TESTNET_ROUTER_ADDRESS,
      ABI,
      signer
    );

    const path = [fromToken, toToken];

    // Convert human-readable amount to smallest unit
    const parsedAmountIn = ethers.parseUnits(amountIn.toString(), decimals);

    const amountsOut = await router.getAmountsOut(parsedAmountIn, path);

    return ethers.formatUnits(amountsOut[1], decimals);
  } catch (error) {
    console.error("Error in getAmountsOut:", error);
    return "0";
  }
};

export const formatBalance = (balance) => {
  const num = Number(balance);
  if (isNaN(num) || num === 0) return "0";

  // Handle large numbers
  if (num >= 1000) {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  // Handle small numbers with increasing precision
  let precision = 2;
  while (num < 1 && precision < 14) {
    precision++;
    if (Number(num.toFixed(precision)) !== 0) break;
  }

  return num.toFixed(precision);
};
