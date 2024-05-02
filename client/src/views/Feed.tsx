import React from 'react';
import { StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useMedia } from '../hooks/apiHooks';
import UserPost from '../components/UserPost'; // Corrected component name

const Feed = () => {
  const { mediaArray } = useMedia(); // Assuming useMedia hook returns mediaArray correctly

  return (
    <ImageBackground
      source={require('./gradient.png')} // Assuming gradient.png is in the same directory
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {mediaArray.map((item, index) => (
          <UserPost key={index.toString()} item={item}/>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: 0, // Changed zIndex to 0 as it should be behind other elements
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
