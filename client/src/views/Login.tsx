import {Button} from '@rneui/base';
import {useState} from 'react';
import LoginForm from '../components/LoginComponent';
import RegisterForm from '../components/RegisterForm';
import { TouchableOpacity } from 'react-native';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => setToggleRegister(!toggleRegister);
  return (
    <TouchableOpacity>
      {!toggleRegister ? (
        <LoginForm />
      ) : (
        <RegisterForm handleToggle={handleToggle} />
      )}
      <Button
        onPress={handleToggle}
        title={
          !toggleRegister ? 'No account yet? Register here!' : 'Back to Login.'
        }
      />
    </TouchableOpacity>
  );
};

export default Login;
