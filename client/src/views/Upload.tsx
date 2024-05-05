import { Controller, useForm } from "react-hook-form";
import { Button, Card, Input } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFile, useMedia } from "../hooks/apiHooks";

const Upload = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const { postExpoFile } = useFile();
  const { postMedia } = useMedia();

  const initValues = { title: "", description: "" };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initValues,
  });

  const doUpload = async (inputs: { title: string; description: string }) => {
    if (!image) {
      Alert.alert("No media selected");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const fileResponse = await postExpoFile(image.assets![0].uri, token);
        const mediaResponse = await postMedia(fileResponse, inputs, token);
        Alert.alert(mediaResponse.message);
      }
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageBackground
        source={require("./gradient.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          style={{
            flex: 1,
            justifyContent: "center",
            zIndex: 1000,
            backgroundColor: "rgba(255, 161, 146, 0.7)",
            overflow: "hidden",
          }}
          activeOpacity={1}
        >
          <Card containerStyle={styles.card}>
            {image ? (
              image.assets![0].mimeType?.includes("video") ? (
                <Video
                  style={{
                    height: 300 * 1.5,
                    alignSelf: "center",
                    margin: "auto",
                  }}
                  source={{ uri: image.assets![0].uri }}
                  useNativeControls
                />
              ) : (
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={{ uri: image.assets![0].uri }}
                    style={styles.image}
                  />
                </View>
              )
            ) : null}
            {!image ? (
              <TouchableOpacity
                onPress={pickImage}
                style={styles.placeholderContainer}
              >
                <Text style={styles.placeholderText}>+</Text>
              </TouchableOpacity>
            ) : null}
            <Card.Divider />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Title is required",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Title"
                  placeholderTextColor={"white"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.title?.message}
                  style={{ fontSize: 25, fontWeight: "bold", color: "white" }}
                />
              )}
              name="title"
            />

            <Controller
              control={control}
              rules={{
                maxLength: 1000,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Description"
                  placeholderTextColor={"white"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.description?.message}
                  multiline={true}
                  numberOfLines={5}
                  style={{
                    height: 120,
                    textAlignVertical: "top",
                    color: "white",
                  }}
                />
              )}
              name="description"
            />
            <Button
              title="Choose media"
              titleStyle={styles.title}
              onPress={pickImage}
              buttonStyle={styles.button}
            />
            <Card.Divider />
            <Button
              title="Upload"
              buttonStyle={styles.button}
              titleStyle={styles.title}
              onPress={handleSubmit(doUpload)}
            />
          </Card>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "rgba(255, 161, 146, 0.7)",
    overflow: "hidden",
    zIndex: 1000,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 1000,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: "auto",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgba(255, 161, 146, 0.9)",
    padding: 20,
    borderColor: "peachpuff",
    borderWidth: 4,
    overflow: "hidden",
  },
  placeholderContainer: {
    height: 300,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "peachpuff",
    margin: "auto",
    paddingTop: 250,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    height: 300,
    margin: "auto",
    paddingBottom: 20,
    marginBottom: 20,
    overflow: "hidden",
    fontSize: 60,
    textAlign: "center",
    color: "peachpuff",
  },
  imageContainer: {
    height: 300,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "peachpuff",
    margin: "auto",
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },

  button: {
    backgroundColor: "rgba(255, 161, 146, 0.7)",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default Upload;
