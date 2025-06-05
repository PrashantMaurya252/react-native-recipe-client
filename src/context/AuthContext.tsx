import axios from 'axios';
import {createContext, ReactNode, useState} from 'react';

const API_URL = 'http://10.0.2.2:5000';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    return true;
  };

  const signOut = async (): Promise<void> => {};
  return (
    <AuthContext.Provider
      value={{token, isLoading, userId, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
