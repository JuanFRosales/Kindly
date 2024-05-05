import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BottomNavigator from "./src/navigators/bottomNavigator";
import { UserProvider } from "./src/contexts/UserContext";
import { UpdateProvider } from "./src/contexts/UpdateContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Background from "./src/components/Background";

const App = () => {
  return (
    <SafeAreaProvider>
    <UserProvider>
      <Background/>
      <UpdateProvider>
        <BottomNavigator/>
        <StatusBar style="auto" />

      </UpdateProvider>
    </UserProvider>
    </SafeAreaProvider>
  );
};
export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#f6d992",
    margin: -10,
    zIndex: -1,
  },
});
