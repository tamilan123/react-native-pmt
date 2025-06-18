import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import CardDetails from "../../components/card-details";
import CardDetailsPageLoader from "../../components/card-details/card-details-page-loader";
import { ItemDetailsApi } from "../../../utils/api/methods-marketplace";

const ItemDetails = () => {
  const route = useRoute();
  const { slug } = route.params || {};
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchItemDetails = async () => {
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
    };

    fetchItemDetails();
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.loaderWrapper}>
        <CardDetailsPageLoader />
        {/* Or fallback: <ActivityIndicator size="large" color="#FFE501" /> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CardDetails slug={slug} item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ItemDetails;
