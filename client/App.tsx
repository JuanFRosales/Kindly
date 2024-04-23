import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {PaperProvider} from 'react-native-paper';
import BottomNavigator from './src/navigators/bottomNavigator';


export default function App() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <BottomNavigator/>
        <Text></Text>
        <StatusBar style="auto" />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#f6d992',


  },

});
