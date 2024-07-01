import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyTabs from "@/navigators/MyTabs";

export default function RootLayout() {
  return (
        <MyTabs />
  );
}
