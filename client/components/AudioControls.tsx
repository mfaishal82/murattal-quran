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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2E7D32",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#3E4A59",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    color: "#3E4A59",
    marginRight: 10,
  },
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
  downloadButton: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2196F3",
  },
});

export default AudioControls;
