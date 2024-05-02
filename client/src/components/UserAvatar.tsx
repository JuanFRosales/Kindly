import * as React from "react";
import { Avatar } from "react-native-paper";
import { ImageSourcePropType, StyleSheet } from "react-native";

const UserAvatar = () => {
  const avatarSource: ImageSourcePropType = {
    uri: "https://avatars.githubusercontent.com/u/26627004",
  };

  return (
    <Avatar.Image
      size={avatarSource.uri ? 69 : 0}
      source={avatarSource}
      style={styles.avatarStyle}
      onError={(error) => console.log("Avatar image load error:", error)}
      onLoad={() => console.log("Avatar image loaded successfully")}
    />
  );
};

const styles = StyleSheet.create({
  avatarStyle: {
    borderWidth: 2,
    borderColor: "peachpuff",
    overflow: "hidden",
    justifyContent: "space-around",
    alignSelf: "flex-start",
  },
});

export default UserAvatar;
