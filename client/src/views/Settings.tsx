import * as React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import UpdateAvatar from "../components/UpdateProfilePicture";


const Settings = () => {
  return (
    <ImageBackground
      source={require("./gradient.png")} // Provide the correct relative path to the image
      style={styles.backgroundImage}
      resizeMode="cover" // Cover the entire container
    >
      <View style={styles.box}>
      <UpdateAvatar />

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
