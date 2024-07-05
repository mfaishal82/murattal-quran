import { Stack } from "expo-router";


const MyStack = () => {
    return(
        <>
        <Stack>
            <Stack.Screen name="loginScreen"/>
            <Stack.Screen name="registerScreen"/>
        </Stack>
        </>
    )
}

export default MyStack;