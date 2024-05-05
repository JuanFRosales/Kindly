import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Card} from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "../hooks/ContextHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFile, useMedia } from "../hooks/apiHooks";

const UpdateAvatar = () => {
  const { user } = useUserContext();
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | any>(null);
  const { postExpoFile } = useFile();
  const { postMedia } = useMedia();

  const doUpload = async (inputs: any) => {
    if (!image) {
      Alert.alert("No media selected");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const fileResponse = await postExpoFile(image.assets![0].uri, token);
        const mediaResponse = await postMedia(fileResponse, inputs, token);
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.6,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      return;
    }

    doUpload({ inputs: { title: "", description: "" } })
      .then(() => {

      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <Card containerStyle={styles.card}>
        {user && (
          <Card.Image
            style={styles.profilepic}
            source={{ uri: user.profile_picture }}
          />
        )}
        <Button
          title="Choose media"
          onPress={pickImage}
          buttonStyle={styles.button}
          titleStyle={styles.title}
        />
        <Button
          title="Upload"
          buttonStyle={styles.button}
          titleStyle={styles.title}
          onPress={handleSubmit}
        />
      </Card>

  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(255, 161, 146, 0.7)",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    margin: 10,

  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor: 'rgba(255, 161, 146, 0.9)',
    borderColor: 'peachpuff',
    borderWidth: 4,
    borderRadius: 10,
    padding: 10,
    margin: 'auto',
    overflow: 'hidden',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profilepic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
    margin: 10,
  },


});

export default UpdateAvatar;
