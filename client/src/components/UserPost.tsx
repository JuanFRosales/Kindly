import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import UserAvatar from "./UserAvatar";
import { MediaItemWithOwner } from "../types/DBTypes";

type UserPostProps = {

  item: MediaItemWithOwner;

};



const UserPost: React.FC<UserPostProps> = ({
  item: { title, description, },
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <UserAvatar />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Card.Content>
        <Text style={styles.description}>{description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/750" }} />
      <Card.Actions>
        <Button style={styles.button}>❤️‍🔥</Button>
        <Button style={styles.button}>📝</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(246, 161, 146, 0.7)",
    marginBottom: 10,
    borderRadius: 30,
    borderColor: "#f6a192",
    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#de6752",
    marginRight: 10,
    borderWidth: 0,
  },
});

export default UserPost;
