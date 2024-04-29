/*
import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserWithNoPassword} from '../types/DBTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {AuthContextType, Credentials} from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials: Credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      if (loginResult) {
        await AsyncStorage.setItem('token', loginResult.token);
        setUser(loginResult.user);
      }
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      // remove token from local storage
      await AsyncStorage.removeItem('token');
      // set user to null
      setUser(null);
      // navigate to home
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // get token from local storage
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // if token exists, get user data from API
        const userResponse = await getUserByToken(token);
        // set user to state
        setUser(userResponse.user);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
*/
