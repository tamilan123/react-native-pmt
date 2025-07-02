import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import CountDownComponent from "../../components/common-layout/counter-component";
import VoteModalPopup from "../vote-modal-popup";
// import { useWallet } from "../../../context/WalletContext";
import { formatNumber } from "../common";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // Accounting for padding and gap

const StatusIndicator = ({ end_at }) => {
  const endDate = dayjs(end_at);
  const now = dayjs();
  const differenceInHours = endDate.diff(now, "hour");
  const isEndingSoon = differenceInHours <= 12;

  return (
    <View
      style={[
        styles.statusContainer,
        { backgroundColor: isEndingSoon ? "#FF6C00" : "#71B243" }
      ]}
    >
      <View
        style={[
          styles.statusDot,
          { backgroundColor: isEndingSoon ? "#FFFFFF" : "#1E4800" }
        ]}
      />
      <Text style={styles.statusText}>
        {isEndingSoon ? "Ending Soon" : "Active"}
      </Text>
    </View>
  );
};

const VoteCard = ({ data, onVoted }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [votingTimeIsCompleted, setVotingTimeIsCompleted] = useState(false);
  const [hasVoted, setHasVoted] = useState(data?.user_voted_option);

  const isLogin = useSelector((state) => state?.user?.login);
  //   const { isConnected, connectWallet } = useWallet();
  const isConnected = true;
  const connectWallet = true;

  const handleOpenModal = () => {
    if (!isLogin) {
      Toast.show({
        type: "error",
        text1: "Login Required",
        text2: "Please log in to cast your vote."
      });
      return;
    }

    if (!isConnected) {
      Toast.show({
        type: "info",
        text1: "Connect Wallet",
        text2: "Please connect your wallet to vote."
      });

      setTimeout(connectWallet, 1000);
      return;
    }

    setIsOpenPopup(true);
  };

  const handleSuccessfulVote = () => {
    setHasVoted(true);
    if (onVoted) onVoted();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Voting Ends in:&nbsp;
          <Text style={styles.headerCountdown}>
            <CountDownComponent
              date={data?.end_date}
              isSetTime={setVotingTimeIsCompleted}
            />
          </Text>
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.topRow}>
          <StatusIndicator end_at={data?.end_date} />

          {data?.total_votes > 0 && (
            <View style={styles.voterGroup}>
              <FlatList
                horizontal
                data={data.total_votes_profile_images?.slice(0, 2) || []}
                keyExtractor={(item, index) => `avatar-${index}`}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={styles.avatar} />
                )}
              />
              <Text style={styles.voteCount}>
                {formatNumber(data?.total_votes)}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.voteTitle}>{data?.name}</Text>

        <TouchableOpacity
          style={[styles.voteButton, hasVoted && styles.disabledButton]}
          onPress={handleOpenModal}
          disabled={hasVoted || votingTimeIsCompleted}
        >
          <Text style={styles.voteButtonText}>
            {hasVoted ? "Voted" : "Vote Now"}
          </Text>
        </TouchableOpacity>
      </View>

      {isOpenPopup && (
        <VoteModalPopup
          isOpen={isOpenPopup}
          onOpenChange={() => setIsOpenPopup(false)}
          data={data}
          onVoted={handleSuccessfulVote}
        />
      )}
    </View>
  );
};

// Grid wrapper component to display cards in rows of 2
const VoteCardGrid = ({ voteData, onVoted }) => {
  const renderVoteCard = ({ item, index }) => (
    <View
      style={[styles.cardWrapper, index % 2 === 1 && styles.cardWrapperRight]}
    >
      <VoteCard data={item} onVoted={onVoted} />
    </View>
  );

  return (
    <FlatList
      data={voteData}
      renderItem={renderVoteCard}
      keyExtractor={(item, index) => `vote-card-${index}`}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      columnWrapperStyle={styles.row}
    />
  );
};

export default VoteCard;
export { VoteCardGrid };

const styles = StyleSheet.create({
  // Grid styles
  gridContainer: {
    padding: 16
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16
  },
  cardWrapper: {
    width: cardWidth
  },
  cardWrapperRight: {
    // Additional styling for right card if needed
  },

  card: {
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    flex: 1
  },
  header: {
    backgroundColor: "#000",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6
  },
  headerText: {
    color: "#fff",
    fontSize: 10
  },
  headerCountdown: {
    fontWeight: "bold"
  },
  body: {
    padding: 10,
    gap: 10,
    flex: 1
  },
  topRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-start,",
    justifyContent: "space-between"
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    height: 20
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4
  },
  statusText: {
    fontSize: 9,
    color: "#000"
  },
  voterGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9E9E9",
    borderRadius: 6,
    paddingHorizontal: 6,
    height: 20
  },
  avatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: -4,
    borderWidth: 1,
    borderColor: "#fff"
  },
  voteCount: {
    fontSize: 9,
    fontWeight: "500",
    color: "#000",
    marginLeft: 6
  },
  voteTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    minHeight: 40,
    flex: 1
  },
  voteButton: {
    backgroundColor: "#FFE501",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: "auto"
  },
  voteButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000"
  },
  disabledButton: {
    opacity: 0.6
  }
});
