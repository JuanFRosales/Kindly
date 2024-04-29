import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
//import {useUserContext} from '../hooks/ContextHooks';
import { ScrollView, StyleSheet } from "react-native";
import ProfilePicture from "../components/ProfilePicture";
import { MediaItemWithOwner } from "../types/DBTypes";

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
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>User Posts</Text>
            <Text style={styles.cardTitle}>Post 1</Text>
            <Text style={styles.cardTitle}>Post 2</Text>
            <Text style={styles.cardTitle}>Post 3</Text>
          </Card.Content>
        </Card>
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
