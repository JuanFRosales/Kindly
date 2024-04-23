import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Feed from '../views/Feed';
import ProfileView from '../views/Profile';
import Settings from '../views/Settings';
const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'profile', title: 'Profile', icon: 'account' },
    { key: 'feed', title: 'Feed', icon: 'newspaper' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileView, // Use ProfileView instead of Profile
    feed: Feed,
    settings: Settings,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.navigator}
      activeColor="#FFFFFF"
      inactiveColor="#CCCCCC"
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
    zIndex: 100,
  },
});

export default BottomNavigator;
