/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { StyleSheet, ImageBackground, ScrollView } from "react-native";
import { NavigationContainer, NavigationProp, ParamListBase } from "@react-navigation/native";
import { useMedia } from "../hooks/apiHooks";
import UserPost from "../components/UserPost";
import UploadButton from "../components/UploadButton";


const Feed = () => {
  const { mediaArray } = useMedia();
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

      <UploadButton />
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
});

export default Feed;
