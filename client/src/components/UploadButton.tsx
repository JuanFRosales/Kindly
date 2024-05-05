import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Upload from '../views/Upload';
import { Button } from 'react-native-elements';
import { useState } from 'react';




const UploadButton = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => setToggleRegister(!toggleRegister);
  return (
    <TouchableOpacity style={styles.container}>
    {!toggleRegister ? (

      <Button
        onPress={handleToggle}
        title={"+"}
        buttonStyle={styles.button}
        titleStyle={styles.title}
        containerStyle={styles.container}
      />
    ) : (
      <Upload />
    )}
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    marginTop: 10,
    width: "50%",
    alignSelf: "center",
    zIndex: 1000,
    marginBottom: 20,
    overflow: "hidden",
    display: "flex",
    position: "relative",
    height: 80,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "peachpuff",
    textAlign: "center",
    lineHeight: 40,
  },
  container: {
    overflow: "hidden",
    width: "50%",
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 100,
    backgroundColor: "black",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 500,

    opacity: 0.8,
  },
});

export default UploadButton;
