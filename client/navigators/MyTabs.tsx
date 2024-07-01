import { Stack, Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export default function MyTabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: "Home"
        }}
      />
      <Tabs.Screen
        name="PrayerTime"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock" color={color} size={size} />
          ),
          title: "Prayer Time"
        }}
      />
      <Tabs.Screen
        name="AboutApp"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size} />
          ),
          title: "About App"
        }}
      />
    </Tabs>
  );
}