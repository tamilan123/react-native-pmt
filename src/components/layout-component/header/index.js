// Header.js (React Native)
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../../assets/images/logo.png";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleNavigate = (route) => {
    setMenuVisible(false);
    navigation.navigate(route);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => handleNavigate("home")}>
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setMenuVisible(true)}
        style={styles.menuButton}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <Modal visible={menuVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handleNavigate("home")}>
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate("staking")}>
              <Text style={styles.menuItem}>Staking</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate("tokenSwap")}>
              <Text style={styles.menuItem}>Token Swap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate("dao")}>
              <Text style={styles.menuItem}>DAO</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate("signUp")}>
              <Text style={styles.menuItem}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate("login")}>
              <Text style={styles.menuItem}>Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain"
  },
  menuButton: {
    padding: 10
  },
  menuIcon: {
    color: "#FFE501",
    fontSize: 28
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  menuContainer: {
    backgroundColor: "#000",
    padding: 20
  },
  menuItem: {
    color: "#FFE501",
    fontSize: 18,
    marginVertical: 10
  }
});
