import * as React from 'react';
import { ScrollView, ImageBackground, StyleSheet } from 'react-native';
import UserPost from '../components/UserPost';



const ProfileView= () => {
  return (
    <ImageBackground
      source={require('./gradient.png')} // Provide the correct relative path to the image
      style={styles.backgroundImage}
      resizeMode="cover" // Cover the entire container
    >
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire container
  },
});

export default ProfileView;
