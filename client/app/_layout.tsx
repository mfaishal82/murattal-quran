import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import MyTabs from "@/navigators/MyTabs";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import axios from 'axios';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (token) {
        // Verify token with backend
        const response = await axios.post('http://localhost:3000/auth/verify-token', { token });
        if (response.data.valid) {
          setIsSignedIn(true);
        } else {
          await SecureStore.deleteItemAsync('access_token');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!isReady) {
    return null; // or a loading spinner
  }
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, isNewUser, setIsNewUser }}>
      <MyTabs />
    </AuthContext.Provider>
  );
}