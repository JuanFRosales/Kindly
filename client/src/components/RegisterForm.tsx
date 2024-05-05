import { Controller, useForm } from "react-hook-form";
import {  Card, Input, Button } from "@rneui/base";
import { Alert, StyleSheet } from "react-native";
import { useUser } from "../hooks/apiHooks";

const RegisterForm = ({ handleToggle }: { handleToggle: () => void }) => {
  const { postUser, getUsernameAvailable, getEmailAvailable } = useUser();
  const initValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: initValues,
    mode: "onBlur",
  });

  const doRegister = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      await postUser(inputs);
      Alert.alert("User created", "You can now login");
      handleToggle();
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <Card containerStyle={styles.card}>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "is required",
          },
          validate: async (value) => {
            try {
              const { available } = await getUsernameAvailable(value);
              console.log("username available?", value, available);
              return available ? available : "Username taken";
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
            style={{fontSize: 25, fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(255, 161, 146, 0.9)', margin: -4, borderColor: 'peachpuff', borderWidth: 4, borderRadius: 10, padding: 10, textAlign: 'center'}}

          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          // pattern: {
          //   value:
          //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
          //   message:
          //     'Password must contain at least 5 characters, 1 special character (@, $, !, %, *, #, ?, &), and 1 number',
          // },
          required: { value: true, message: "is required" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{fontSize: 25, fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(255, 161, 146, 0.9)', margin: -4, borderColor: 'peachpuff', borderWidth: 4, borderRadius: 10, padding: 10, textAlign: 'center'}}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "is required" },
          validate: (value) =>
            value === getValues().password ? true : "Passwords do not match",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Confirm password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{fontSize: 25, fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(255, 161, 146, 0.9)', margin: -4, borderColor: 'peachpuff', borderWidth: 4, borderRadius: 10, padding: 10, textAlign: 'center'}}
            errorMessage={errors.confirmPassword?.message}

          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: { value: true, message: "is required" },
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email address",
          },
          validate: async (value) => {
            try {
              const { available } = await getEmailAvailable(value);
              return available ? available : "Email taken";
            } catch (error) {
              console.log((error as Error).message);
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
            autoCapitalize="none"
            style={{fontSize: 25, fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(255, 161, 146, 0.9)', margin: -4, borderColor: 'peachpuff', borderWidth: 4, borderRadius: 10, padding: 10, textAlign: 'center'}}
          />
        )}
        name="email"
      />
      <Button title="Register" buttonStyle={styles.button} titleStyle={styles.title} onPress={handleSubmit(doRegister)} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 161, 146, 0.9)",
    margin: -3,
    borderColor: "peachpuff",
    borderWidth: 4,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    width: "100%",
  },
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
},
});
export default RegisterForm;
