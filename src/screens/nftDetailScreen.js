import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import CardDetails from "../components/nft-details";
import CardDetailLoader from "../components/nft-card-loader";
import { ItemDetailsApi } from "../../src/api/methods-marketplace";
import data from "../components/common";

const ItemDetailsScreen = () => {
  const route = useRoute();
  const { slug } = route.params;
  // const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // const fetchItemDetails = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await ItemDetailsApi({ slug });
  //     if (response?.data) {
  //       setItem(response.data);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching item details:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [slug]);

  // useEffect(() => {
  //   if (!slug) return;
  //   fetchItemDetails();
  // }, [slug, fetchItemDetails]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <CardDetailLoader />
      </View>
    );
  }

  return (
    <CardDetails slug={slug} item={data} fetchItemDetails={fetchItemDetails} />
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
