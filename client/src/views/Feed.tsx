import React, { useState } from "react";
import { StyleSheet, ImageBackground, ScrollView } from "react-native";
import { useMedia } from "../hooks/apiHooks";
import UserPost from "../components/UserPost";
import { Button } from "react-native-elements";

const Feed = () => {
  const { mediaArray } = useMedia();
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => setToggleRegister(!toggleRegister);
  return (
    <ImageBackground
    source={require("./gradient.png")}
    style={styles.backgroundImage}
    resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {mediaArray.map((item, index) => (
          <UserPost key={index.toString()} item={item} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 0,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 20,
  },

  container: {
    overflow: "hidden",
    width: "4%",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 100,
    backgroundColor: "rgba(255, 111, 116, 1)",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 500,
    marginRight: 20,
    opacity: 0.8,
  },
});

export default Feed;
