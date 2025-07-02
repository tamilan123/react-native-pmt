import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable
} from "react-native";
import dayjs from "dayjs";

const ViewModalPopup = ({ isOpen, onOpenChange, data }) => {
  const votingPercentage = (count) => {
    const total = data?.total_votes || 0;
    return total > 0 ? ((count / total) * 100).toFixed(1) : 0;
  };

  const icons = {
    proposal: require("../../assets/icon/view-result-icon-1.png"),
    ended: require("../../assets/icon/view-result-icon-2.png"),
    votes: require("../../assets/icon/view-result-icon-3.png"),
    breakdown: require("../../assets/icon/view-result-icon-4.png")
  };

  return (
    <Modal
      visible={isOpen}
      onRequestClose={onOpenChange}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalBody}>
            {/* Proposal */}
            <View style={styles.section}>
              <View style={styles.row}>
                <Image source={icons.proposal} style={styles.icon} />
                <Text style={styles.text}>
                  <Text style={styles.label}>Proposal: </Text>
                  {data?.name}
                </Text>
              </View>
            </View>

            {/* Voting Ended & Total Votes */}
            <View style={styles.section}>
              <View style={styles.row}>
                <Image source={icons.ended} style={styles.icon} />
                <Text style={styles.text}>
                  <Text style={styles.label}>Voting Ended: </Text>
                  {dayjs(data?.end_date).format("MMM D, YYYY")}
                </Text>
              </View>
              <View style={styles.row}>
                <Image source={icons.votes} style={styles.icon} />
                <Text style={styles.text}>
                  <Text style={styles.label}>Total Votes: </Text>
                  {data?.total_votes}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.row}>
                <Image source={icons.breakdown} style={styles.icon} />
                <Text style={styles.breakdownLabel}>Voting Breakdown:</Text>
              </View>
              {data?.results?.map((item, index) => (
                <Text key={index} style={styles.breakdownText}>
                  {item.name}: {votingPercentage(item?.total_votes)}% (
                  {item.total_votes} {item.total_votes > 1 ? "votes" : "vote"})
                </Text>
              ))}
            </View>

            {/* Close */}
            <Pressable onPress={onOpenChange} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ViewModalPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden"
  },
  modalBody: {
    padding: 20
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: "#C2C2C2",
    borderStyle: "dashed",
    paddingBottom: 16,
    marginBottom: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  },
  text: {
    fontSize: 14,
    color: "#000"
  },
  label: {
    fontWeight: "600"
  },
  breakdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  },
  breakdownText: {
    marginLeft: 34,
    fontSize: 14,
    color: "#000"
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#FFE501",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center"
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14
  }
});
