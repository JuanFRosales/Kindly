import { Button } from "@rneui/base";
import { useState } from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import LoginForm from "../components/LoginComponent";
import RegisterForm from "../components/RegisterForm";
import { StyleSheet } from "react-native";


const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => setToggleRegister(!toggleRegister);
  return (
    <ImageBackground
      source={require("./gradient.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
      >
    <TouchableOpacity style={styles.form}>
      {!toggleRegister ? (
        <LoginForm  />
      ) : (
        <RegisterForm handleToggle={handleToggle} />
      )}
      <Button
        onPress={handleToggle}
        title={
          !toggleRegister ? " Register here!" : "Back to Login."
        }
        buttonStyle={styles.button}
        titleStyle={styles.title}
      />

    </TouchableOpacity>
    </ImageBackground>
  );
};

const styles =StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 111, 116, 1)',
    borderColor: 'peachpuff',
    borderWidth: 4,
    borderRadius: 10,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    zIndex: 1000,

},
title: {
  fontSize: 25,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  lineHeight: 40,

},
backgroundImage: {
  flex: 1,
  resizeMode: "cover",

},
form: {
  margin: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  width: '80%',
  height: '100%',
  overflow: 'visible',
},
});

export default Login;
