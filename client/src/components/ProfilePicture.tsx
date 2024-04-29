import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { ImageSourcePropType, ViewStyle, StyleSheet } from 'react-native';

const ProfilePicture = () => {
  const avatarSource: ImageSourcePropType = {
    uri: 'https://avatars.githubusercontent.com/u/26627004',
  };

  return (
    <Avatar.Image
      size={250}
      source={avatarSource}
      style={styles.avatarStyle} // Use styles.avatarStyle instead of plain avatarStyle
      onError={(error) => console.log('Avatar image load error:', error)}
      onLoad={() => console.log('Avatar image loaded successfully')}
    />
  );
};

const styles = StyleSheet.create({
  avatarStyle: {
    width: 250, // Set width and height to maintain the specified size
    height: 250,
    borderWidth: 2,
    borderColor: 'peachpuff',
    alignSelf: 'center', // Center the avatar horizontally
    borderRadius: 125, // Ensure the avatar is circular (half of the specified size)
    overflow: 'hidden',
    justifyContent: 'space-around',
  },
});

export default ProfilePicture;
