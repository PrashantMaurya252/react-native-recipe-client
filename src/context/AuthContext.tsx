import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

const API_URL = 'http://10.0.2.2:5000';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const getStoredToken = await AsyncStorage.getItem('token');
      const getStoredUserId = await AsyncStorage.getItem('userId');

      if (getStoredToken && getStoredUserId) {
        setToken(getStoredToken);
        setUserId(getStoredUserId);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
    return false;
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const signUp = async (email: string, password: string): Promise<boolean> => {
    console.log(email, password);

    try {
      const result = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
      });
      console.log(result, 'result');
      if (result?.data?.success) return true;
      else return false;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.error('Error Details', error.response?.data);
      }
      return false;
    }
    return true;
  };
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      const {token, userId, success} = result?.data;

      if (success) {
        await AsyncStorage.setItem('token', token);
        setToken(token);
        await AsyncStorage.setItem('userId', userId);
        setUserId(userId);
        setIsAuthenticated(true);
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.error('Error Details', error.response?.data);
      }
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      console.log('logout');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      setUserId(null);
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <ActivityIndicator size={'large'} color={'red'} />;
  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        userId,
        signIn,
        signUp,
        signOut,
        checkAuth,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
