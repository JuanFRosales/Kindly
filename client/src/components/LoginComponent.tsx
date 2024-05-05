import { Controller, useForm } from "react-hook-form";
import { Button, Card, Input } from "@rneui/base";
import { useUserContext } from "../hooks/ContextHooks";
import { Credentials } from "../types/LocalTypes";
import { StyleSheet } from "react-native";

const LoginForm = () => {
  const { handleLogin } = useUserContext();
  const initValues: Credentials = {
    username: "",
    password: "",
    email: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initValues,
  });

  const doLogin = async (inputs: Credentials) => {
    handleLogin(inputs);
  };

  return (
    <Card containerStyle={styles.card}>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Username is required",
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
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              backgroundColor: "rgba(255, 161, 146, 0.9)",
              margin: -3,
              borderColor: "peachpuff",
              borderWidth: 4,
              borderRadius: 10,
              padding: 10,
              textAlign: "center",
            }}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: { value: true, message: "is required" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              backgroundColor: "rgba(255, 161, 146, 0.9)",
              margin: -4,
              borderColor: "peachpuff",
              borderWidth: 4,
              borderRadius: 10,
              padding: 10,
              textAlign: "center",
            }}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Button
        title="Login"
        titleStyle={styles.title}
        buttonStyle={styles.button}
        onPress={handleSubmit(doLogin)}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  card: {
    margin: "auto",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "95%",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgba(255, 161, 146, 0.9)",
    padding: 20,
    borderColor: "peachpuff",
    borderWidth: 4,
  },
});

export default LoginForm;
