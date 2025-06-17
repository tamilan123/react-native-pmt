import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import binaceIcon from "../../assets/images/binace-black.png";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import signSellOrder from "../../utils/signSellOrder";
import { SettingsApi } from "../../api/methods-marketplace";
import ScreenLayout from "../screen-layout/screenLayout";

export default function NftDetailsScreen() {
  const route = useRoute();

  const { item } = route.params || {};
  console.log("🚀 ~ NftDetailsScreen ~ item:", item);

  // const { isConnected, connectWallet } = useWallet();
  const isConnected = item?.data?.isConnected;

  // const { user } = useSelector((state) => state);
  const user = item?.data?.user;

  // const [web3Data, setWeb3Data] = useState(null);
  // const [cardCollection, setCardCollection] = useState([]);

  const isOwner = false;
  // item?.data?.collection?.owner?.address?.toLowerCase() ===
  // web3Data?.address?.toLowerCase();

  const sale_status = item?.data?.collection?.sale_status;
  const physical_asset = item?.data?.collection?.physical_nft;
  const isPhysicalAsset = physical_asset === "true" || physical_asset === true;
  const trackDetails = item?.data?.shipping_status;
  const isDelivered = trackDetails === "delivered";

  const image_hash = item?.data?.collection?.image_hash;
  const imgSrc = `https://ipfs.io/ipfs/${image_hash}`;
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

  //   fetchData();
  //   fetchSettings();
  // }, []);

  // const fetchSettings = async () => {
  //   try {
  //     const settings = await SettingsApi();

  //     const getAddressById = (id) =>
  //       settings.data.nft_contracts.find((nft) => nft.id === id)?.address;

  //     setNftAddress(getAddressById(contract_id));

  //     const erc20 = Object.fromEntries(
  //       settings.data.erc20_contracts.map((token) => [
  //         token.symbol,
  //         token.address
  //       ])
  //     );

  //     setErc20PMTAddress(erc20.PMT);
  //     setTradeContractAddress(settings?.data?.tradeContractAddress || null);
  //     setTransferProxyAddress(
  //       settings?.data?.transferProxyContractAddress || null
  //     );
  //   } catch (err) {
  //     console.log("fetchSettings error:", err);
  //   }
  // };

  // useEffect(() => {
  //   const fetchMetadata = async () => {
  //     if (!meta_hash) return;

  //     try {
  //       const response = await fetch(`https://ipfs.io/ipfs/${meta_hash}`);
  //       const data = await response.json();
  //       setMetadata(data);
  //     } catch (error) {
  //       console.error("Error fetching metadata:", error);
  //     }
  //   };

  //   fetchMetadata();
  // }, [meta_hash]);

  // const handleCardCollection = async () => {
  //   setIsNftCardLoading(true);
  //   try {
  //     const result = await NFTCollectionsList();
  //     if (result) {
  //       setCardCollection(result.data.data);
  //     }
  //   } catch (err) {
  //     console.log("handleCardCollection error:", err);
  //   } finally {
  //     setIsNftCardLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handleCardCollection();
  // }, []);

  return (
    <ScreenLayout>
      <ScrollView style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.imageSection}>
            <View style={styles.imageHeader}>
              <Image
                source={require("../../assets/images/binace.png")}
                style={styles.icon}
              />
            </View>
            <Image source={imgSrc} style={styles.nftImage} />
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.dropdown}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </View>

            <View style={styles.info}>
              <Text style={styles.title}>{item?.data?.collection?.name}</Text>
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

            <View style={styles.infoBox}>
              <Text style={styles.boxTitle}>Creator</Text>
              <View style={styles.creatorRow}>
                <Image
                  source={require("../../assets/images/crtr.png")}
                  style={styles.creatorImage}
                />
                <Text style={styles.creatorAddress}>
                  {item?.data?.collection?.creator?.address}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View>
        <Text style={styles.relatedTitle}>Related Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.slice(0, 4).map((collection, idx) => (
            <View key={idx} style={styles.card}>
              
              <Text>{collection?.title || "NFT Card"}</Text>
            </View>
          ))}
        </ScrollView>
      </View> */}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff"
  },
  topSection: {
    flexDirection: "column"
  },
  imageSection: {
    backgroundColor: "#FFE501",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 8
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
  price: {
    fontSize: 18,
    fontWeight: "600"
  },
  usdEstimate: {
    color: "#666"
  },
  actionRow: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center"
  },
  primaryButton: {
    backgroundColor: "#FFE501",
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
  infoBox: {
    borderWidth: 1,
    borderColor: "#C2C2C2",
    padding: 12,
    marginVertical: 8,
    borderRadius: 12
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
