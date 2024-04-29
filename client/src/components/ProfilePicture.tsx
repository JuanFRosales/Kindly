import * as React from 'react';
import { Avatar } from 'react-native-paper';
import { ImageSourcePropType, ViewStyle } from 'react-native';

const ProfilePicture = () => {
  const avatarSource: ImageSourcePropType = {
    uri: 'https://avatars.githubusercontent.com/u/26627004',
  };
  return (
    <Avatar.Image
      size={250}
      source={avatarSource}
      style={avatarStyle}
      onError={(error) => console.log('Avatar image load error:', error)}
      onLoad={() => console.log('Avatar image loaded successfully')}
    />
  );
};

const avatarStyle: ViewStyle = {
  borderWidth: 2,
  borderColor: 'white',
  alignSelf: 'center',
  
};

export default ProfilePicture;
