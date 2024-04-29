import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Feed from '../views/Feed';
import ProfileView from '../views/Profile';
import Settings from '../views/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'profile', title: 'Profile', icon: 'account' },
    { key: 'feed', title: 'Feed', icon: 'cards-heart-outline' },
    { key: 'settings', title: 'Settings', icon: 'wrench' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileView,
    feed: Feed,
    settings: Settings,
  });

  const renderIcon = ({ route, color, focused }: { route: any; color: string; focused: boolean }) => {

    const iconSize = focused ? 35 : 30;
    return <Icon name={route.icon} size={iconSize} color={color} />;
  }


  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        barStyle={styles.navigator}
        activeColor="#FFFFFF"
        inactiveColor="#CCCCCC"
        labeled={false} // Show labels in tabs (change to `true` to show labels)
        shifting={false} // Disable shifting style animation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigator: {
   alignSelf: 'center',
    bottom: 0,
    width: '90%',
    backgroundColor: '#f6a192', // Background color of the bottom navigation bar
    borderWidth: 8,
    borderRadius: 20,
    borderColor: 'peachpuff',
    overflow: 'hidden',
    height: 80,
  },
});

export default BottomNavigator;
