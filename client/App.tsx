import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import Navigator from './src/navigators/Navigator';

const App = () => {
  console.log('moro');
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app! and fix Navigator!!!!!!!!!</Text>
      <Navigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
