import { Stack, Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AuthLayout() {
  const { isSignedIn } = useContext(AuthContext);

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
    </Stack>
  );
}