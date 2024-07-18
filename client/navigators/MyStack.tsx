import { Stack } from "expo-router";


const MyStack = () => {
    return(
        <>
        <Stack>
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
        </Stack>
        </>
    )
}

export default MyStack;
