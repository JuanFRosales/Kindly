import React from 'react';
import { Avatar } from 'react-native-paper';
import { ImageSourcePropType, StyleSheet } from 'react-native';

interface UserAvatarProps {
  style?: any; // Define the type for the style prop
}

const UserAvatar: React.FC<UserAvatarProps> = ({ style }) => {
  const avatarSource: ImageSourcePropType = {
    uri: 'https://avatars.githubusercontent.com/u/26627004',
  };

  return (
    <Avatar.Image
      size={69} // Fixed size for the avatar
      source={avatarSource}
      style={[styles.avatarStyle, style]} // Apply custom styles passed from parent
      onError={(error) => console.log('Avatar image load error:', error)}
      onLoad={() => console.log('Avatar image loaded successfully')}
    />
  );
};

const styles = StyleSheet.create({
  avatarStyle: {
    borderWidth: 2,
    borderColor: 'peachpuff',
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
  },
});

export default UserAvatar;
