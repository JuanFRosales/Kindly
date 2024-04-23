import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Feed from '../views/Feed';

const Profile = () => <Text>Profile</Text>;
const Settings = () => <Text>Settings</Text>;

const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'profile', title: 'Profile', icon: 'account' },
    { key: 'feed', title: 'Feed', icon: 'newspaper' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: Profile,
    feed: Feed,
    settings: Settings,
  });

  return (
    <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={renderScene}
    barStyle={styles.navigator}
    activeColor="#FFFFFF" // Color for the active tab icon and label
    inactiveColor="#CCCCCC" // Color for the inactive tab icons and labels
    />
  );
};
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navigator: {
    height: 80,
    margin: 0,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    borderColor: '#f6a192',
    borderWidth: 1,
    backgroundColor: '#f6a192',
    overflow: 'hidden',

  },
});

export default BottomNavigator;
