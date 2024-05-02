import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";

const UpdateAvatar = () => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Please enable camera roll permissions to select an image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {avatarUri ? (
        <Avatar.Image size={120} source={{ uri: avatarUri }} />
      ) : (
        <Avatar.Icon size={120} icon="account" />
      )}

      <Button title="Choose Image" onPress={pickAvatar} />

      {avatarUri && (
        <Button
          title="Save"
          onPress={() => {
            console.log("Save Avatar");
          }}
        />
      )}
    </View>
  );
};

export default UpdateAvatar;
