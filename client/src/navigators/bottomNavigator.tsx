import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const Profile = () => <Text>Profile</Text>;

const Feed = () => <Text>Feed</Text>;

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
    />
  );
};

export default BottomNavigator;
