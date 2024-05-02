import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feed from "../views/Feed";
import ProfileView from "../views/Profile";
import Settings from "../views/Settings";

const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "profile", title: "Profile", icon: "account" },
    { key: "feed", title: "Feed", icon: "cards-heart-outline" },
    { key: "settings", title: "Settings", icon: "wrench" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileView,
    feed: Feed,
    settings: Settings,
  });

  const renderIcon = ({
    route,
    color,
    focused,
  }: {
    route: any;
    color: string;
    focused: boolean;
  }) => {
    const iconSize = focused ? 36 : 30;
    return <Icon name={route.icon} size={iconSize} color={color} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        barStyle={styles.navigator}
        activeColor="#751102"
        inactiveColor="#ffea98"
        labeled={true} // Show labels in tabs (change to `true` to show labels)
        shifting={true} // Disable shifting style animation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigator: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#f6a192",
    borderWidth: 8,
    borderRadius: 20,
    borderColor: "peachpuff",
    overflow: "hidden",
    height: 80,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
});

export default BottomNavigator;
