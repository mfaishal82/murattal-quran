import { Text, View } from "react-native"

const AboutApp = () => {
    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>About This App</Text>
            <Text>This application is designed to provide information about the Quran recitation (murattal). It allows users to listen to various recitations of the Quran.</Text>
            <Text>Features:</Text>
            <Text>- Multiple reciters to choose from</Text>
            <Text>- Search functionality to find specific surahs or reciters</Text>
            <Text>- Bookmark favorite recitations</Text>
            <Text>- Adjustable playback speed</Text>
        </View>
    )
}

export default AboutApp