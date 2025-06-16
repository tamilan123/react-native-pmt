import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import CollectionCard from "../../components/home/collection-card";
import Collection1 from "../../../src/assets/images/collection 1.png";
import Collection2 from "../../../src/assets/images/collection 2.png";
import PML from "../../images/PML_Logo.png";
import { SettingsApi } from "../../api/methods-marketplace";

const Collection = () => {
  const [tradableCount, setTradableCount] = useState(null);
  const [nonTradableCount, setNonTradableCount] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings = await SettingsApi();
      const tradable = settings?.data?.tradable ?? null;
      const nonTradable = settings?.data?.non_tradable ?? null;
      setTradableCount(tradable);
      setNonTradableCount(nonTradable);
    } catch (err) {
      console.log("🚀 ~ fetchSettings ~ err:", err);
    }
  };

  const collections = [
    {
      title: "PMT Fractionated RWAs NFT Collection",
      type: "tradable",
      typeShow: "Tradable",
      description:
        "Exclusive collection featuring limited-edition RWAs in collaboration with Rocketbyz. Exclusive collection featuring limited-edition RWAs in collaboration with Rocketbyz.",
      nftCount: tradableCount,
      imgSrc: Collection1
    },
    {
      title: "Rocketbyz x PMT Limited RWA Collection",
      type: "non_tradable",
      typeShow: "Non-Tradable",
      description:
        "Exclusive collection featuring limited-edition RWAs in collaboration with Rocketbyz. Exclusive collection featuring limited-edition RWAs in collaboration with Rocketbyz.",
      nftCount: nonTradableCount,
      imgSrc: Collection2
    }
  ];

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={PML} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>COLLECTIONS</Text>
        </View>

        <View style={styles.cardContainer}>
          {collections.map((collection, index) => (
            <CollectionCard key={index} {...collection} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f9f9f9" // substitute for bg-white-900 if defined
  },
  container: {
    paddingVertical: 48,
    paddingHorizontal: 16,
    maxWidth: 1280,
    alignSelf: "center",
    width: "100%"
  },
  header: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 32,
    alignItems: "flex-start"
  },
  logo: {
    width: 250, // 15.625rem ≈ 250px
    height: 60
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 3,
    color: "#000",
    fontFamily: "BrunoAce-Regular" // custom font if used
  },
  cardContainer: {
    flexDirection: "column",
    gap: 32
  }
});

export default Collection;
