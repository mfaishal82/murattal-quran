import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

interface DownloadButtonProps {
  audioUrl: string;
  downloadProgress: number;
  setDownloadProgress: (progress: number) => void;
  setDownloading: (downloading: boolean) => void;
  isDisabled: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  audioUrl,
  downloadProgress,
  setDownloadProgress,
  setDownloading,
  isDisabled,
}) => {
  const downloadAudio = async () => {
    try {
      setDownloading(true);
      const downloadResumable = FileSystem.createDownloadResumable(
        audioUrl,
        FileSystem.documentDirectory + `${audioUrl.split("/").pop()}`,
        {},
        onDownloadProgress
      );

      const { uri } =
        (await downloadResumable.downloadAsync()) as FileSystem.DownloadResult;
      console.log("Downloaded to:", uri);
      Alert.alert(
        "Download Complete",
        `File MP3 has been downloaded successfully.\nYou can find it in ${uri}`
      );
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Download Failed", "Failed to download MP3 file.");
    } finally {
      setDownloading(false);
    }
  };

  const onDownloadProgress = (progress: FileSystem.DownloadProgressData) => {
    const progressRatio =
      progress.totalBytesWritten / progress.totalBytesExpectedToWrite;
    setDownloadProgress(progressRatio);
  };

  return (
    <TouchableOpacity
      onPress={downloadAudio}
      style={[
        styles.iconButton,
        styles.downloadButton,
        isDisabled && styles.disabledButton,
      ]}
      disabled={isDisabled}
    >
      <MaterialIcons
        name="file-download"
        size={24}
        color={isDisabled ? "#9E9E9E" : "#2196F3"}
      />
      <Text
        style={[
          styles.buttonText,
          { color: isDisabled ? "#9E9E9E" : "#2196F3" },
        ]}
      >
        Download
      </Text>
    </TouchableOpacity>
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
    color: "grey",
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#F5F5F5",
  },
});

export default DownloadButton;
