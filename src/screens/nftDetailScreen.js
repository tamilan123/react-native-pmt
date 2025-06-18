import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import binaceIcon from "../../src/assets/images/binace.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
// import signSellOrder from "../../utils/signSellOrder";
import {
  ItemDetailsApi,
  NFTRelatedCollectionsList,
  SettingsApi
} from "../../../utils/api/methods-marketplace";
import ScreenLayout from "../screen-layout/screenLayout";
import { useCallback, useEffect, useState } from "react";
import NFTCard from "../nft-card";

export default function NftDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [relatedProdList, setRelatedProdList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [nftAddress, setNftAddress] = useState(null);
  const [isTradable, setIsTradable] = useState(false);
  const [buyerPlatformFee, setBuyerPlatformFee] = useState(null);
  const [sellerPlatformFee, setSellerPlatformFee] = useState(null);
  const [erc20PMTAddress, setErc20PMTAddress] = useState(null);
  const [tradeContractAddress, setTradeContractAddress] = useState(null);
  const [transferProxyAddress, setTransferProxyAddress] = useState(null);

  const fetchItemDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ItemDetailsApi({ slug });
      if (response?.data) {
        setItem(response.data);
      }
    } catch (err) {
      console.error("Error fetching item details:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    fetchItemDetails();
    fetchSettings();
  }, [slug, fetchItemDetails]);

  const { slug } = route.params || {};

  // const { isConnected, connectWallet } = useWallet();
  const isConnected = item?.data?.isConnected;

  // const { user } = useSelector((state) => state);
  const user = item?.data?.user;

  // const [web3Data, setWeb3Data] = useState(null);
  // const [cardCollection, setCardCollection] = useState([]);

  const isOwner = false;
  // item?.data?.collection?.owner?.address?.toLowerCase() ===
  // web3Data?.address?.toLowerCase();

  const contract_id = item?.data?.collection?.nft_contract_id;

  const sale_status = item?.data?.collection?.sale_status;
  const physical_asset = item?.data?.collection?.physical_nft;
  const isPhysicalAsset = physical_asset === "true" || physical_asset === true;
  const trackDetails = item?.data?.shipping_status;
  const isDelivered = trackDetails === "delivered";
  const collectionType = item?.data?.collection?.collection_type;

  const image_hash = item?.data?.collection?.image_hash;
  const imgSrc = `https://gateway.pinata.cloud/ipfs/${image_hash}`;
  const price =
    item?.data?.collection?.resale_price ||
    item?.data?.collection?.instant_sale_price;

  const handleBuyClick = () => {
    if (user?.login) {
      setIsPopupOpen((prev) => !prev);
    } else {
      navigation.navigate("login");
    }
  };

  const handleSignSellOrder = () => {
    // signSellOrder(slug, item, erc20PMTAddress);
    console.log("sign sell Order trigerred");
  };

  const handleResaleClick = () => {
    setIsResaleOpen((prev) => !prev);
  };

  const handleTrackClick = () => {
    setsTrackPopupOpen((prev) => !prev);
  };

  const formatWalletAddress = (walletAddress) => {
    if (walletAddress) {
      const firstPart = walletAddress.slice(0, 4);
      const lastPart = walletAddress.slice(-4);
      return `${firstPart}........${lastPart}`;
    } else {
      return "--";
    }
  };

  const getDaysAgoText = (createdAt) => {
    const days = Math.floor(
      (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
    );
    return `Bought ${days} day${days !== 1 ? "s" : ""} ago`;
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const provider = new ethers.JsonRpcProvider("<YOUR_RPC_URL>");
  //       const accounts = await provider.listAccounts();

  //       if (accounts.length > 0) {
  //         const signer = await provider.getSigner(accounts[0]);
  //         const address = await signer.getAddress();
  //         setWeb3Data({ provider, signer, address });

  //         const balanceWei = await provider.getBalance(address);
  //         setBalance(ethers.formatEther(balanceWei));
  //       } else {
  //         Alert.alert("Connect your wallet", "Please connect your wallet.");
  //       }
  //     } catch (error) {
  //       console.error("Error connecting wallet:", error);
  //       Toast.show({
  //         type: "error",
  //         text1: "Wallet Connection Error",
  //         text2: error.message
  //       });
  //     }
  //   };

  const handleRelatedProd = async () => {
    try {
      setIsLoading(true);
      const result = await NFTRelatedCollectionsList(slug);
      if (result) {
        setRelatedProdList(result.data.data || []);
      }
    } catch (err) {
      console.log("🚀 ~ handleRelatedProd ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRelatedProd();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings = await SettingsApi();

      const getAddressById = (contract_id) => {
        return settings.data.nft_contracts.find((nft) => nft.id === contract_id)
          ?.address;
      };
      const getAddressByType = (contract_id) => {
        console.log("🚀 ~ fetchSettings ~ tradeContract:", tradeContract);
        return settings.data.nft_contracts.find((nft) => nft.id === contract_id)
          ?.contract_type;
      };

      const nft_address = getAddressById(contract_id);
      const tradable = getAddressByType(contract_id);

      if (tradable === "tradable") {
        setIsTradable(true);
      } else {
        setIsTradable(false);
      }

      const erc20 = Object.fromEntries(
        settings.data.erc20_contracts.map((token) => [
          token.symbol,
          token.address
        ])
      );

      // const owner_address = settings?.data?.ownerAddress ? settings?.data?.ownerAddress : null
      const tradeContract = settings?.data?.tradeContractAddress
        ? settings?.data?.tradeContractAddress
        : null;
      const transferProxy = settings?.data?.transferProxyContractAddress
        ? settings?.data?.transferProxyContractAddress
        : null;

      const seller_platform_fee = settings?.data?.seller_platform_fees
        ? settings?.data?.seller_platform_fees
        : null;
      const buyer_platform_fee = settings?.data?.buyer_platform_fees
        ? settings?.data?.buyer_platform_fees
        : null;

      setNftAddress(nft_address);
      setBuyerPlatformFee(buyer_platform_fee);
      setSellerPlatformFee(seller_platform_fee);
      setErc20PMTAddress(erc20.PMT);
      setTradeContractAddress(tradeContract);
      setTransferProxyAddress(transferProxy);
    } catch (err) {
      console.log("🚀 ~ fetchSettings ~ err:", err);
    }
  };

  return (
    <ScreenLayout>
      <ScrollView style={styles.container}>
        <View style={styles.backButtonWrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.dropdown}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </View>
        </View>

        <View style={styles.topSection}>
          <View style={styles.imageSection}>
            <View style={styles.imageHeader}>
              <Image source={binaceIcon} style={styles.icon} />
            </View>
            <Image source={{ uri: imgSrc }} style={styles.nftImage} />
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.info}>
              <Text style={styles.title}>{item?.data?.collection?.name}</Text>
              <View style={styles.tagsRow}>
                {isPhysicalAsset ? (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>#Physical</Text>
                  </View>
                ) : (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>#Digital</Text>
                  </View>
                )}
                {isTradable ? (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>#Tradeable</Text>
                  </View>
                ) : (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>#Non-Tradeable</Text>
                  </View>
                )}
              </View>
              <Text style={styles.description}>
                {item?.data?.collection?.description}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>{price} PMT</Text>
                <Text style={styles.usdEstimate}>
                  ~${item?.data?.collection?.instant_sale_price}
                </Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              {!isOwner && isConnected ? (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleBuyClick}
                >
                  <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
              ) : isOwner && isConnected ? (
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    (sale_status === "evaluate" && isDelivered) ||
                    sale_status === "sale_rejected" ||
                    sale_status === "new_nft"
                      ? styles.disabledButton
                      : null
                  ]}
                  onPress={() => {
                    if (
                      (sale_status === "purchased" &&
                        isPhysicalAsset &&
                        !isDelivered) ||
                      sale_status === "evaluate"
                    ) {
                      handleTrackClick();
                    } else if (
                      sale_status === "purchased" &&
                      isPhysicalAsset &&
                      isDelivered
                    ) {
                      handleResaleClick();
                    } else if (
                      (sale_status === "purchased" && !isPhysicalAsset) ||
                      sale_status === "sale_approved"
                    ) {
                      handleSignSellOrder();
                    }
                  }}
                  disabled={
                    (sale_status === "evaluate" && isDelivered) ||
                    sale_status === "sale_rejected" ||
                    sale_status === "new_nft"
                  }
                >
                  <Text style={styles.buttonText}>
                    {(sale_status === "purchased" &&
                      isPhysicalAsset &&
                      !isDelivered) ||
                    sale_status === "evaluate"
                      ? "Track Details"
                      : sale_status === "purchased" &&
                        isPhysicalAsset &&
                        isDelivered
                      ? "Resale"
                      : sale_status === "purchased" && !isPhysicalAsset
                      ? "List For Sale"
                      : sale_status === "sale_approved"
                      ? "List For Sale"
                      : sale_status === "sale_rejected"
                      ? "Sale Rejected"
                      : sale_status === "new_nft"
                      ? "Listed For Sale"
                      : ""}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.primaryButton}
                  // onPress={connectWallet}
                >
                  <Text style={styles.buttonText}>Connect Wallet</Text>
                </TouchableOpacity>
              )}

              {/* <TouchableOpacity style={styles.cartButton}>
              <Image source={require("../../assets/images/cart")} style={styles.cartIcon} />
            </TouchableOpacity> */}
            </View>

            <View style={styles.infoContainer}>
              {/* Creator */}
              <View style={[styles.infoBox, styles.halfBox]}>
                <Text style={styles.boxTitle}>Creator</Text>
                <View style={styles.creatorRow}>
                  <Image
                    source={require("../../assets/images/crtr.png")}
                    style={styles.creatorImage}
                  />
                  <Text style={styles.creatorAddress}>
                    {formatWalletAddress(
                      item?.data?.collection?.creator?.address
                    )}
                  </Text>
                </View>
              </View>

              <View style={[styles.infoBox, styles.halfBox]}>
                <Text style={styles.boxTitle}>Collections</Text>
                <View style={styles.creatorRow}>
                  <Image
                    source={require("../../assets/images/crtr.png")}
                    style={styles.creatorImage}
                  />
                  <Text style={styles.creatorAddress}>
                    {collectionType === "single"
                      ? "NFT 721"
                      : collectionType === "multiple"
                      ? "NF 1155"
                      : "--"}
                  </Text>
                </View>
              </View>

              <View style={[styles.infoBox, styles.fullBox]}>
                <Text style={styles.boxTitle}>History</Text>
                <View style={styles.creatorRow}>
                  <Image
                    source={require("../../assets/images/crtr.png")}
                    style={styles.creatorImage}
                  />
                  <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text
                      style={[styles.creatorAddress, { fontWeight: "600" }]}
                    >
                      {getDaysAgoText(item?.data?.collection.owner.created_at)}
                    </Text>
                    <Text style={styles.creatorAddress}>
                      {formatWalletAddress(
                        item?.data?.collection.owner.address
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {relatedProdList?.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>Related Products</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              {relatedProdList.slice(0, 20).map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.cardWrapper,
                    index === relatedProdList.length - 1 && { marginRight: 20 }
                  ]}
                >
                  <NFTCard item={item} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {!relatedProdList?.length > 0 && isLoading && (
          <View>
            <Text style={styles.relatedTitle}>Related Products</Text>
            <View style={styles.scrollContainer}>
              <Text style={{ textAlign: "center", color: "#888" }}>
                Loading........
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff"
  },
  backButtonWrapper: {
    marginBottom: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backButton: {
    width: 56,
    height: 36,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },

  topSection: {
    flexDirection: "column"
  },
  imageSection: {
    backgroundColor: "#FFE500",
    borderRadius: 16
  },
  imageHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain"
  },
  nftImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  detailsSection: {
    marginTop: 16
  },
  dropdown: {
    alignSelf: "flex-end",
    padding: 8
  },
  info: {
    marginVertical: 8
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8
  },
  fullBox: {
    width: "100%"
  },
  tag: {
    backgroundColor: "#FFF8B6",
    borderColor: "#FFE501",
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15
  },
  tagText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  description: {
    color: "#333",
    marginVertical: 4
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  nftGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10
  },
  price: {
    fontSize: 18,
    fontWeight: "600"
  },
  usdEstimate: {
    color: "#666"
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row"
  },

  cardWrapper: {
    marginRight: 12
  },

  actionRow: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center"
  },
  primaryButton: {
    backgroundColor: "#FFE501",
    borderColor: "#000",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center"
  },
  cartButton: {
    padding: 12,
    backgroundColor: "#FFE501",
    marginLeft: 4,
    borderRadius: 8
  },
  cartIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8
  },
  infoBox: {
    borderWidth: 1,
    borderColor: "#C2C2C2",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6
  },
  halfBox: {
    width: "48%" // Roughly half with spacing
  },
  boxTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8
  },
  creatorRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  creatorImage: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  creatorAddress: {
    marginLeft: 8,
    flex: 1,
    flexWrap: "wrap",
    fontSize: 14
  },
  boxTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8
  },
  creatorRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  creatorImage: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  creatorAddress: {
    marginLeft: 8,
    flex: 1,
    flexWrap: "wrap"
  },
  relatedTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12
  },
  card: {
    width: 160,
    height: 200,
    backgroundColor: "#EEE",
    marginRight: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  }
});
