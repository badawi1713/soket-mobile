import {SETTINGS} from '@/constants/settings';
import {storage} from '@/utils/mmkv';
import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios, {AxiosError} from 'axios';
import React, {createContext, ReactNode, useState} from 'react';
import {toast} from 'sonner-native';

export interface ErrorResponse {
  message: string;
}

interface User {
  email: string;
  fullName: string;
  id: string;
  role: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (
    params: LoginParams,
    navigation: AuthNavigationProp,
    errorCallback?: (error: AxiosError) => void,
  ) => Promise<void>;
  logout: (navigation: AuthNavigationProp) => Promise<void>;
  handleUnauthorized: (navigation: AuthNavigationProp) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginParams {
  id: string;
  password: string;
  rememberMe: boolean;
  force?: boolean;
}

// Define a type for navigation
type AuthNavigationProp = StackNavigationProp<ParamListBase>;

const defaultProvider: AuthContextType = {
  user: null,
  setUser: () => null,
  login: async () => {},
  logout: async () => {},
  handleUnauthorized: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);

  const handleUnauthorized = (navigation: AuthNavigationProp) => {
    setUser(null);
    storage.delete('userData');
    storage.delete(SETTINGS?.storageTokenKeyName);
    delete axios.defaults.headers.common.Authorization;

    return navigation.replace('login');
  };

  const handleLogin = async (
    params: LoginParams,
    navigation: AuthNavigationProp,
    errorCallback?: (error: AxiosError) => void,
  ) => {
    try {
      const response = await axios.post(SETTINGS?.loginEndpoint, {
        username: params.id,
        password: params.password,
        via: 'WEB',
        force: params.force,
      });

      if (params.rememberMe) {
        await storage.set(SETTINGS?.storageTokenKeyName, response.data.token);
        await storage.set('userData', JSON.stringify(response.data.user));
      }

      setUser(response.data.user);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      navigation.replace('main-app');
    } catch (err) {
      if (axios.isAxiosError(err) && errorCallback) {
        errorCallback(err);
      } else {
        toast.error(`Unexpected error: ${err}`);
      }
    }
  };

  const handleLogout = async (navigation: AuthNavigationProp) => {
    try {
      await axios.post(SETTINGS.logoutEndpoint, {
        via: 'WEB',
        userId: user?.id || '',
      });

      setUser(null);
      storage.delete('userData');
      storage.delete(SETTINGS?.storageTokenKeyName);
      delete axios.defaults.headers.common.Authorization;

      navigation.replace('login');
      toast.success('You have been logged out');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          `${err.response?.data?.message || 'An unknown error occurred.'}`,
        );
      } else {
        toast.error('Error: Something went wrong.');
      }
    }
  };

  const values: AuthContextType = {
    user,
    setUser,
    login: handleLogin,
    logout: handleLogout,
    handleUnauthorized,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider};
