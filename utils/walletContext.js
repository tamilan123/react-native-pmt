// import React, { createContext, useContext, useState, useEffect } from "react";
// import WalletConnectProvider, {
//   useWalletConnect
// } from "@walletconnect/react-native-dapp";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ethers } from "ethers";

// const WalletContext = createContext();

// export const WalletProvider = ({ children }) => {
//   const connector = useWalletConnect();
//   const [signer, setSigner] = useState(null);
//   const [provider, setProvider] = useState(null);

//   useEffect(() => {
//     if (connector.connected) {
//       const web3Provider = new ethers.providers.Web3Provider(connector);
//       setProvider(web3Provider);
//       setSigner(web3Provider.getSigner());
//     } else {
//       setProvider(null);
//       setSigner(null);
//     }
//   }, [connector.connected]);

//   const connectWallet = React.useCallback(() => {
//     if (!connector.connected) {
//       connector.connect();
//     }
//   }, [connector]);

//   const disconnectWallet = React.useCallback(() => {
//     if (connector.connected) {
//       connector.killSession();
//     }
//   }, [connector]);

//   return (
//     <WalletContext.Provider
//       value={{
//         address: connector?.accounts?.[0] || null,
//         connectWallet,
//         disconnectWallet,
//         signer,
//         provider,
//         connector,
//         connected: connector?.connected
//       }}
//     >
//       {children}
//     </WalletContext.Provider>
//   );
// };

// export const useWallet = () => useContext(WalletContext);
