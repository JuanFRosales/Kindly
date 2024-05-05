import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import UpdateAvatar from "../components/UpdateProfilePicture";


const Settings = () => {
  return (
    <ImageBackground
      source={require("./gradient.png")} // Provide the correct relative path to the image
      style={styles.backgroundImage}
      resizeMode="cover" // Cover the entire container
    >
      <UpdateAvatar />

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Cover the entire container
  },
});

export default Settings;
