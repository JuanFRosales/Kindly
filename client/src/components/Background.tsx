import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Background = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./gradient.png')} style={styles.background} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Background;
