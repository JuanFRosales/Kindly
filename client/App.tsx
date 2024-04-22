import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
