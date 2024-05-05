import React from "react";
import { Button, Card, Icon, ListItem } from "@rneui/base";
import { useUserContext } from "../hooks/ContextHooks";
import { ImageBackground, StyleSheet } from "react-native";
import MyFiles from "./MyFiles";

const Profile = () => {
  const { handleLogout, user } = useUserContext();

  return (
    <ImageBackground
      source={require("./gradient.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {user ? ( // Render profile information if user is logged in
        <Card containerStyle={styles.card}>
          <Card.Image
            style={styles.profilepic}
            source={{ uri: user.profile_picture }}
          >
            {/* You can adjust the above Image component according to your requirements */}
          </Card.Image>
          <ListItem containerStyle={styles.list}>
            <ListItem.Title style={styles.title}>
              {user.username}
            </ListItem.Title>
            <ListItem.Title style={styles.title}>
              <Icon iconStyle={styles.icon} name="email" /> {user.email}
            </ListItem.Title>
          </ListItem>
          <MyFiles />
          <Button buttonStyle={styles.button} onPress={handleLogout}>
            Logout &nbsp;
            <Icon name="logout" color="white" />
          </Button>
        </Card>
      ) : null}{" "}
      {/* Render nothing if user is not logged in */}
      {!user && ( // Render login card if user is not logged in
        <Card containerStyle={styles.form}>
          <Card.Title style={styles.text}>Login to see content</Card.Title>
        </Card>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 161, 146, 0.9)",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    overflow: "hidden",
    width: "80%",
    alignSelf: "center",
  },
  profilepic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    overflow: "hidden",
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    backgroundColor: "rgba(255, 161, 146, 0.9)",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    overflow: "hidden",
    color: "#751102",
    justifyContent: "space-around",
  },
  list: {
    flexDirection: "column",
    backgroundColor: "rgba(255, 161, 146, 0.9)",
  },
  button: {
    backgroundColor: "rgba(255, 111, 116, 1)",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 10,
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
    zIndex: 1000,
  },
  icon: {
    color: "peachpuff",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginRight: 10,
  },
  form: {
    backgroundColor: "rgba(255, 161, 146, 0.9)",
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    height: "100%",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "peachpuff",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "space-around",
    margin: 10,
    marginTop: 30,
    color: "peachpuff",
    textShadowColor: "#751102",
    textShadowOffset: { width: 1, height: 1 },
  },
});

export default Profile;
