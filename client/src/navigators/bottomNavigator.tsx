import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Feed from "../views/Feed";
import ProfileView from "../views/Profile";
import Settings from "../views/Settings";
import Upload from "../views/Upload";
import Login from "../views/Login";

const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "profile", title: "Profile", icon: "account" },
    { key: "feed", title: "Feed", icon: "cards-heart-outline" },
    { key: "settings", title: "settings", icon: "wrench" },
    { key: "upload", title: "Upload", icon: "plus" },
    { key: "login", title: "Login", icon: "login" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileView,
    feed: Feed,
    settings: Settings,
    upload: Upload,
    login: Login,
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
        labeled={false}
        shifting={true}
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
