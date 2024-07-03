import { Stack, Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

export default function MyTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1E8449',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 50,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" size={size} color={color} />
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