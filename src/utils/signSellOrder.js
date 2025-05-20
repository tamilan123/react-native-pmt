import { ethers, getBytes, parseUnits } from "ethers";
import { addToast } from "@heroui/react";
import { signSellOrderApi } from "../api/methods-marketplace";

const signSellOrder = async (slug, item, erc20PMTAddress) => {
  const collection = item?.data?.collection;
  const sale_price = collection?.resale_price || collection?.instant_sale_price;
  const owner_address = collection?.owner?.address?.toLowerCase();
  const tokenId = collection?.token;
  const decimals = 18;

  try {
    const nonce_value = Math.floor(Date.now() / 1000);

    if (!window.ethereum) {
      throw new Error(
        "MetaMask not detected. Please install MetaMask to proceed."
      );
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    if (!erc20PMTAddress) {
      throw new Error("PMT token address is not configured.");
    }

    if (!sale_price || isNaN(sale_price)) {
      throw new Error("Invalid or missing sale price.");
    }

    const unitPrice = parseUnits(sale_price.toString(), decimals);
    const buyerFee = (unitPrice * 2n) / 100n;
    const totalPaymentAmt = unitPrice + buyerFee;

    const wethMessageHash = ethers.solidityPackedKeccak256(
      ["address", "uint256", "address", "uint256", "uint256"],
      [owner_address, tokenId, erc20PMTAddress, totalPaymentAmt, nonce_value]
    );

    const messageHashBytes = getBytes(wethMessageHash);
    const signature = await signer.signMessage(messageHashBytes);

    const result = await signSellOrderApi({
      slug,
      instant_sale_price: sale_price,
      sign_instant_sale_price: signature,
      nonce: nonce_value
    });

    if (result?.status === 200) {
      addToast({
        title: "Signature Generated",
        description: "Signature generated successfully!",
        color: "success",
        variant: "bordered"
      });
    } else {
      throw new Error("Failed to generate signatures on server.");
    }
  } catch (err) {
    console.error("Sign Order Error:", err);
    addToast({
      title: "Error",
      description: err?.message || "An error occurred while signing the order.",
      color: "danger",
      variant: "bordered"
    });
  }
};
export default signSellOrder;
