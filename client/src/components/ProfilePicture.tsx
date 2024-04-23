import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarExample = () => {
    return (
        <View style={styles.container}>
            <Avatar.Image
                size={50}
                source={{
                }}
            />
        </View>
    );
};

export default AvatarExample;

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    
});
