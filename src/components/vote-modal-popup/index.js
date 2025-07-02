import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import Toast from "react-native-toast-message";
import CountDownComponent from "../../components/common-layout/counter-component";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { voteSchema } from "../../../utils/yubSchema/validate";
import { DaoVoteSubmitApi } from "../../../utils/api/methods-marketplace";
import { formatUnits } from "ethers";
import { parseAbi } from "viem";
// import { useWallet } from "../../../context/WalletContext";
// import { usePublicClient } from "wagmi";

const PMT_TOKEN_ADDRESS = process.env.REACT_APP_PMT_TOKEN_ADDRESS;

const VoteModalPopup = ({ isOpen, onOpenChange, data, onVoted }) => {
  const [votingTimeIsCompleted, setVotingTimeIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const { isConnected } = useWallet();
  const { isConnected } = true;
  const address = "";
  const user_id = 10;
  //   const publicClient = usePublicClient();
  const publicClient = "";
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(voteSchema)
  });

  useEffect(() => {
    if (isOpen && data) reset();
  }, [isOpen, data, reset]);

  const checkPMTToken = async () => {
    if (!isConnected || !address) {
      Toast.show({
        type: "info",
        text1: "Connect Wallet",
        text2: "Please connect your wallet to vote."
      });
      return false;
    }

    try {
      const decimals = await publicClient.readContract({
        address: PMT_TOKEN_ADDRESS,
        abi: parseAbi(["function decimals() view returns (uint8)"]),
        functionName: "decimals"
      });

      const balance = await publicClient.readContract({
        address: PMT_TOKEN_ADDRESS,
        abi: parseAbi(["function balanceOf(address) view returns (uint256)"]),
        functionName: "balanceOf",
        args: [address]
      });

      const formatted = parseFloat(formatUnits(balance, decimals));
      return formatted > 0;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Token Check Failed",
        text2: "Could not verify PMT token balance."
      });
      return false;
    }
  };

  const onSubmit = async (formData) => {
    if (!data?.id || !user_id) return;

    setIsSubmitting(true);

    const hasPMT = await checkPMTToken();
    if (!hasPMT) {
      Toast.show({
        type: "error",
        text1: "PMT Token Missing",
        text2: "You need PMT tokens to vote."
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      question_option_user: {
        user_id,
        question_id: data.id,
        option_id: Number(formData.option_id)
      }
    };

    try {
      const response = await DaoVoteSubmitApi(payload);

      if (response) {
        Toast.show({
          type: "success",
          text1: "Vote Submitted"
        });
        onOpenChange();
        onVoted();
      } else {
        Toast.show({
          type: "error",
          text1: "Vote Failed",
          text2: "Something went wrong. Try again."
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Vote Error",
        text2: "An error occurred while submitting."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) return null;

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.headerText}>
            Voting Ends in:{" "}
            <Text style={styles.countdownText}>
              <CountDownComponent
                date={data.end_date}
                isSetTime={setVotingTimeIsCompleted}
              />
            </Text>
          </Text>

          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>{data.name}</Text>
            {data.description && (
              <Text style={styles.description}>{data.description}</Text>
            )}

            <Controller
              name="option_id"
              control={control}
              render={({ field }) => (
                <View style={styles.radioGroup}>
                  {data.options?.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => field.onChange(item.id.toString())}
                      style={[
                        styles.radioOption,
                        field.value === item.id.toString() &&
                          styles.radioSelected
                      ]}
                    >
                      <View style={styles.radioCircle} />
                      <Text style={styles.radioLabel}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />

            {errors?.option_id && (
              <Text style={styles.errorText}>{errors.option_id.message}</Text>
            )}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.submitButton}
                disabled={votingTimeIsCompleted || isSubmitting}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.submitText}>
                  {isSubmitting ? "Saving..." : "Submit"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onOpenChange}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default VoteModalPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden"
  },
  headerText: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 8,
    textAlign: "center",
    fontSize: 12
  },
  countdownText: {
    fontWeight: "bold"
  },
  content: {
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12
  },
  radioGroup: {
    marginBottom: 8
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8
  },
  radioSelected: {
    backgroundColor: "#fdf2d8",
    borderRadius: 6
  },
  radioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10
  },
  radioLabel: {
    fontSize: 14,
    color: "#000"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#FFE501",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 6,
    alignItems: "center"
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center"
  },
  submitText: {
    fontWeight: "600",
    color: "#000"
  },
  cancelText: {
    fontWeight: "600",
    color: "#000"
  }
});
