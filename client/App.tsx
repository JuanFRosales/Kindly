import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomNavigator from './src/navigators/bottomNavigator';
import { UserProvider } from './src/contexts/UserContext';
import { UpdateProvider } from './src/contexts/UpdateContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function App() {
  return (
    <SafeAreaProvider>
    <UserProvider>
      <UpdateProvider>
      <View style={styles.container}>
<BottomNavigator/>
<Text>

</Text>
<StatusBar style="auto" />

    </View>
      </UpdateProvider>
    </UserProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#f6d992',
    margin: -10,
    zIndex: -1,
  },

});
