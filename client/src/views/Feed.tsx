import * as React from 'react';
import { ScrollView, ImageBackground, StyleSheet } from 'react-native';
import UserPost from '../components/UserPost';



const Feed = () => {
  return (
    <ImageBackground
      source={require('./gradient.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <UserPost
          mode="elevated"
          title="First Post"
          description="hello world"
          onPress={() => console.log('Post 1 pressed')}
        />
        <UserPost
          mode="elevated"
          title="Post 2"
          description="Welcome to the world of React Native!"
          onPress={() => console.log('Post 2 pressed')}
        />
        <UserPost
          mode="elevated"
          title="Last Post"
          description=""
          onPress={() => console.log('Post 3 pressed')}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: 50,
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
