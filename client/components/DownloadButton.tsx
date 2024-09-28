import React, { useEffect } from "react";
import { TouchableOpacity, Text, Alert, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

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
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Izin Diperlukan", "Aplikasi membutuhkan izin untuk menyimpan file.");
        }
      }
    })();
  }, []);

  const downloadAudio = async () => {
    if (isDisabled) return; // Tambahkan pengecekan ini untuk memastikan fungsi tidak dijalankan saat disabled
    try {
      setDownloading(true);
      const fileName = audioUrl.split("/").pop() || "audio.mp3";

      const downloadResumable = FileSystem.createDownloadResumable(
        audioUrl,
        FileSystem.documentDirectory + fileName,
        {},
        onDownloadProgress
      );

      const result = await downloadResumable.downloadAsync();

      if (result && result.uri) {
        const { uri } = result;
        console.log("Downloaded to:", uri);

        if (Platform.OS === "android") {
          const asset = await MediaLibrary.createAssetAsync(uri);
          const album = await MediaLibrary.getAlbumAsync("Download");
          if (album == null) {
            await MediaLibrary.createAlbumAsync("Download", asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          }
          Alert.alert(
            "Download Selesai",
            `File MP3 telah diunduh ke folder Download.\nLokasi: ${asset.uri}`
          );
        } else {
          Alert.alert(
            "Download Selesai",
            `File MP3 telah diunduh ke folder dokumen aplikasi.\nLokasi: ${uri}`
          );
        }
      } else {
        Alert.alert("Download Gagal", "Tidak dapat memperoleh URI file yang diunduh.");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Download Gagal", "Gagal mengunduh file MP3.");
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
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
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#F5F5F5",
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

export default DownloadButton;