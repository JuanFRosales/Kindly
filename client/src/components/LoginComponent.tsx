import { Controller, useForm } from "react-hook-form";
import { Button, Card, Input } from "@rneui/base";
import { useUserContext } from "../hooks/ContextHooks";
import { Credentials } from "../types/LocalTypes";

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
    <Card>
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
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Button title="Login" onPress={handleSubmit(doLogin)} />
    </Card>
  );
};

export default LoginForm;
