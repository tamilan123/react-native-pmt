import React, { useState } from "react";
import { View, Linking } from "react-native";
import { Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const CustomDropdown = ({ testScan_link, imgSrc }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handlePress = (url) => {
    Linking.openURL(url);
    closeMenu();
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={{ padding: 8 }} onTouchEnd={openMenu}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </View>
        }
      >
        <Menu.Item
          onPress={() => handlePress(testScan_link)}
          title="View on BSCscan"
        />

        <Menu.Item onPress={() => handlePress(imgSrc)} title="View on IPFS" />
      </Menu>
    </View>
  );
};

export default CustomDropdown;
