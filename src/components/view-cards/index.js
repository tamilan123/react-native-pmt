import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList
} from "react-native";
import dayjs from "dayjs";
import ViewModalPopup from "../view-modal-popup"; // Ensure this is converted too
import { formatNumber } from "../common";

const ViewCard = ({ data }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleOpenModal = () => {
    setIsOpenPopup(!isOpenPopup);
  };

  const renderAvatar = ({ item, index }) => {
    if (!item) return null;
    return <Image key={index} source={{ uri: item }} style={styles.avatar} />;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Voting ended on:&nbsp;
          <Text style={styles.headerTextBold}>
            {dayjs(data?.end_date).format("MMMM D, YYYY")}
          </Text>
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.statusTag}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Ended</Text>
          </View>

          <View style={styles.avatarGroup}>
            {data?.total_votes > 0 && (
              <View style={styles.avatarList}>
                {Array.from({ length: Math.min(3, data.total_votes) }).map(
                  (_, idx) => {
                    const image = data.total_votes_profile_images?.[idx];
                    return image ? (
                      <Image
                        key={idx}
                        source={{ uri: image }}
                        style={styles.avatar}
                      />
                    ) : null;
                  }
                )}
              </View>
            )}
            <Text style={styles.voteCountText}>
              {formatNumber(data?.total_votes || 0)}
            </Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {data?.name}
        </Text>

        <TouchableOpacity style={styles.viewButton} onPress={handleOpenModal}>
          <Text style={styles.viewButtonText}>View Detail</Text>
        </TouchableOpacity>
      </View>

      {isOpenPopup && (
        <ViewModalPopup
          isOpen={isOpenPopup}
          onOpenChange={handleOpenModal}
          data={data}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#C2C2C2",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16
  },
  header: {
    backgroundColor: "#000",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8
  },
  headerText: {
    fontSize: 12,
    color: "#FFF",
    textAlign: "center"
  },
  headerTextBold: {
    fontWeight: "600"
  },
  content: {
    padding: 10,
    gap: 12
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F01444",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
    height: 24
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 6
  },
  statusText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "500"
  },
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9E9E9",
    paddingHorizontal: 8,
    borderRadius: 6,
    height: 24
  },
  avatarList: {
    flexDirection: "row",
    marginRight: 4
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    marginLeft: -6
  },
  voteCountText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "500"
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    minHeight: 48
  },
  viewButton: {
    backgroundColor: "#FFE501",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: "center"
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  }
});

export default ViewCard;
