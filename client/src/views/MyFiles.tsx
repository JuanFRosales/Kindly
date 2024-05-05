import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@rneui/base";
import { useMedia } from "../hooks/apiHooks";
import MediaListItem from "../components/UserPost";
import { useUserContext } from "../hooks/ContextHooks";

const MyFiles = () => {
  const { mediaArray } = useMedia();
  const { user } = useUserContext();

  if (!user) {
    return (
      <View>
        <Text>No Media items uploaded yet.</Text>
      </View>
    );
  }
  const myMedia = mediaArray.filter((item) => item.user_id === user.user_id);

  return (
    <>
        <Text style={styles.text}>My Files</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={myMedia}
        renderItem={({ item }) => (
          <MediaListItem item={item} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 30,
    color: "#751102",
    textShadowColor: "peachpuff",
    textShadowOffset: { width: 1, height: 1 },


  },
  list: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 161, 146, 0.9)',
  },
});


export default MyFiles;
