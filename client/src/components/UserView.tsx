import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
//import {useUserContext} from '../hooks/ContextHooks';
import { ScrollView, StyleSheet } from "react-native";
import UserPost from "../components/UserPost";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import ProfilePicture from "../components/ProfilePicture";

const UserView = () => {
  //const {handleLogout, user} = useUserContext();
  //const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <>
      <Card mode="elevated" style={styles.card}>
        <Card.Title title="Username"
        titleStyle={styles.cardTitle}
         />
        <Card.Content>
          <ProfilePicture />
        </Card.Content>
      </Card>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <UserPost
          mode="elevated"
          title="First Post"
          description="hello world"
          onPress={() => console.log("Post 1 pressed")}
        />
        <UserPost
          mode="elevated"
          title="Post 2"
          description="Welcome to the world of React Native!"
          onPress={() => console.log("Post 2 pressed")}
        />
        <UserPost
          mode="elevated"
          title="Last Post"
          description=""
          onPress={() => console.log("Post 3 pressed")}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 20,
    marginBottom: 0,
    borderRadius: 30,
    backgroundColor: "rgba(246, 161, 146, 0.7)",
    borderColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    padding: 10,

  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 20,
  },
  cardTitle: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
   padding: 10,
  },
});

export default UserView;
