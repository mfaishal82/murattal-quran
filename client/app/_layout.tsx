import { AuthContext } from "../context/AuthContext";
import MyTabs from "@/navigators/MyTabs";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Stack, useRouter } from "expo-router";
// import MyStack from "@/navigators/MyStack";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('access_token');
      if (token) {
        const response = await axios.post('https://7fee-114-10-79-77.ngrok-free.app/auth/verify-token', { token });
        if (response.data.valid) {
          setIsSignedIn(true);
          router.push('/(tabs)/index'); // Redirect to index after successful login
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
    return null;
  }
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, isNewUser, setIsNewUser }}>
      <Stack screenOptions={{ headerShown: false }}>
        {isSignedIn === true ? (
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
        )}
      </Stack>
    </AuthContext.Provider>
  )
}