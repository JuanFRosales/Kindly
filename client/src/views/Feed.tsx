import * as React from 'react';
import { ScrollView, ImageBackground, StyleSheet } from 'react-native';
import UserPost from '../components/UserPost';



const Feed = () => {
  return (
    <ImageBackground
      source={require('./gradient.png')} // Provide the correct relative path to the image
      style={styles.backgroundImage}
      resizeMode="cover" // Cover the entire container
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <UserPost
          mode="elevated"
          title="Post 1"
          subtitle="Subtitle 1"
          onPress={() => console.log('Post 1 pressed')}
        />
        <UserPost
          mode="elevated"
          title="Post 2"
          subtitle="Subtitle 2"
          onPress={() => console.log('Post 2 pressed')}
        />
        <UserPost
          mode="elevated"
          title="Post 3"
          subtitle="Subtitle 3"
          onPress={() => console.log('Post 3 pressed')}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire container
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
