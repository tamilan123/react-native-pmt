import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ExploreActive = require ("../../assets/images/footer/explore_y.png");
const ExploreDefault = require ("../../assets/images/footer/explore_w.png");
const DaoActive = require ("../../assets/images/footer/dao_y.png");
const DaoDefault = require ("../../assets/images/footer/dao_w.png");
const StakingActive = require ("../../assets/images/footer/staking_y.png");
const StakingDefault = require ("../../assets/images/footer/staking_w.png");
const SwapActive = require ("../../assets/images/footer/swap_y.png");
const SwapDefault = require ("../../assets/images/footer/swap_w.png");
const ActiveProfile = require ("../../assets/images/footer/profile_y.png");
const DefaultProfile = require ("../../assets/images/footer/profile_w.png");

const tabs = [
  {
    name: "Explore",
    route: "explore",
    active_icon: ExploreActive,
    default_icon: ExploreDefault
  },
  {
    name: "DAO",
    route: "dao",
    active_icon: DaoActive,
    default_icon: DaoDefault
  },
  {
    name: "Staking",
    route: "staking",
    active_icon: StakingActive,
    default_icon: StakingDefault
  },
  {
    name: "Swap",
    route: "swap",
    active_icon: SwapActive,
    default_icon: SwapDefault
  },
  {
    name: "Profile",
    route: "profile",
    active_icon: ActiveProfile,
    default_icon: DefaultProfile
  }
];

const FooterTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleTabPress = (tab) => {
    if (route.name !== tab.route) {
      navigation.navigate(tab.route);
    }
  };

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => handleTabPress(tab)}
        >
          <Image
            source={
              route.name === tab.route ? tab.active_icon : tab.default_icon
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderColor: "#222",
    height: 60,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain"
  }
});

export default FooterTabs;
