// import { Core } from "@walletconnect/core";
// import { Web3Wallet } from "@walletconnect/web3wallet";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// let walletClient = null;

// export const initWalletConnect = async () => {
//   const core = new Core({
//     projectId: "YOUR_PROJECT_ID", // same from RainbowKit
//     storage: AsyncStorage
//   });

//   walletClient = await Web3Wallet.init({
//     core,
//     metadata: {
//       name: "PMT Staking App",
//       description: "Stake your NFTs and tokens",
//       url: "https://yourdapp.com",
//       icons: ["https://yourdapp.com/icon.png"]
//     }
//   });

//   return walletClient;
// };

// export const getWalletClient = () => walletClient;
