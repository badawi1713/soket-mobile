import type React from 'react';
import { createContext, type ReactNode, useEffect, useState } from 'react';
import axios, { type AxiosError } from 'axios';
import SplashScreen from '@/components/SplashScreen';
import { SETTINGS } from '@/constants/settings'; // Adjust the path as needed
import { storage } from '@/utils/mmkv';

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
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (
    params: LoginParams,
    errorCallback?: (error: AxiosError) => void
  ) => Promise<void>;
  logout: (navigation: any) => Promise<void>;
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

const defaultProvider: AuthContextType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => {},
  login: async () => {},
  logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const handleUnauthorized = (navigation: any) => {
    setUser(null);
    storage.delete('userData');
    storage.delete(SETTINGS?.storageTokenKeyName);
    delete axios.defaults.headers.common.Authorization;

    navigation.navigate('Sign-In');
  };

  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401 && error.config) {
        // Navigation must be handled in the screens
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    setLoading(true);
    const initAuth = async () => {
      const storedToken = await storage.getString(
        SETTINGS?.storageTokenKeyName
      );
      if (storedToken) {
        await axios
          .get(SETTINGS?.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => {
            setUser(response.data?.object);
            axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
          })
          .catch((error: AxiosError) => {
            storage.delete('userData');
            storage.delete('refreshToken');
            storage.delete('accessToken');
            setUser(null);
            delete axios.defaults.headers.common.Authorization;
          })
          .finally(() => setTimeout(() => setLoading(false), 1000));
      } else {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (
    params: LoginParams,
    navigation: any,
    errorCallback?: (error: AxiosError) => void
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
      navigation.navigate('Home');
    } catch (err) {
      if (axios.isAxiosError(err) && errorCallback) {
        errorCallback(err);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };

  const handleLogout = async (navigation: any) => {
    try {
      await axios.post(SETTINGS.logoutEndpoint, {
        via: 'WEB',
        userId: user?.id || '',
      });

      setUser(null);
      storage.delete('userData');
      storage.delete(SETTINGS?.storageTokenKeyName);
      delete axios.defaults.headers.common.Authorization;

      navigation.navigate('Sign-In');
      alert('You have been logged out!');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(`Error: ${err.response?.data?.message || 'An unknown error occurred.'}`);
      } else {
        alert('Error: Something went wrong.');
      }
    }
  };

  const values: AuthContextType = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  if (loading) {
    return <SplashScreen />;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
