import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AudioControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  stopAudio: () => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isPaused,
  playAudio,
  pauseAudio,
  stopAudio,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={playAudio}
        disabled={isPlaying}
        style={styles.iconButton}
      >
        <MaterialIcons
          name="play-arrow"
          size={24}
          color={isPlaying ? "#aaa" : "#4CAF50"}
        />
        <Text
          style={[styles.buttonText, { color: isPlaying ? "#aaa" : "#4CAF50" }]}
        >
          Play
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pauseAudio}
        disabled={!isPlaying}
        style={styles.iconButton}
      >
        <MaterialIcons
          name="pause"
          size={24}
          color={!isPlaying ? "#aaa" : "#FFC107"}
        />
        <Text
          style={[
            styles.buttonText,
            { color: !isPlaying ? "#aaa" : "#FFC107" },
          ]}
        >
          Pause
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={stopAudio}
        disabled={!isPlaying && !isPaused}
        style={styles.iconButton}
      >
        <MaterialIcons
          name="stop"
          size={24}
          color={!isPlaying && !isPaused ? "#aaa" : "#D32F2F"}
        />
        <Text
          style={[
            styles.buttonText,
            { color: !isPlaying && !isPaused ? "#aaa" : "#D32F2F" },
          ]}
        >
          Stop
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AudioControls;