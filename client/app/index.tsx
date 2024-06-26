import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Audio, AVPlaybackStatus } from "expo-av";
import SurahPicker from "../components/SurahPicker";
import ReciterPicker from "../components/ReciterPicker";
import MoshafRadio from "../components/MoshafRadio";
import AudioControls from "../components/AudioControls";
import DownloadButton from "../components/DownloadButton";
import ProgressBar from "../components/ProgressBar";
import moment from "moment-hijri";
import { registerBackgroundTask } from "../scripts/BackgroundAudioTask";

const toArabicNumbers = (num: string): string => {
  const arabicDigits: { [key: string]: string } = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
  };
  return num.replace(/[0-9]/g, (d) => arabicDigits[d]);
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [reciters, setReciters] = useState<any[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<number | null>(null);
  const [selectedMoshaf, setSelectedMoshaf] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloading, setDownloading] = useState(false);
  const [hijriDate, setHijriDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.mp3quran.net/api/v3/reciters"
        );
        setReciters(response.data.reciters);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const hijriDate = moment().format('iD iMMMM iYYYY');
    const arabicDate = hijriDate.split(' ').map(toArabicNumbers).join(' ');
    setHijriDate(arabicDate);
  }, []);

  // useEffect(() => {
  //   registerBackgroundTask();
  // }, []);

  const playAudio = async () => {
    if (!selectedSurah || !selectedReciter || !selectedMoshaf) return;

    if (sound && isPaused) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    const reciter = reciters.find((r: any) => r.id === selectedReciter);
    const moshaf = reciter?.moshaf.find(
      (m: { id: string }) => m.id === selectedMoshaf
    );
    const audioUrl = `${moshaf?.server}${selectedSurah}.mp3`;

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, isLooping: false },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      // console.error("Error loading audio", error);
      Alert.alert(
        "Error",
        "Maaf audio Qari' ini tidak tersedia. Silahkan coba Qari' lain."
      );
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#2E7D32" />;
  }

  const audioUrl = `${
    reciters
      .find((r) => r.id === selectedReciter)
      ?.moshaf.find((m: { id: string }) => m.id === selectedMoshaf)?.server
  }${selectedSurah}.mp3`;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Text style={styles.dateStyle}>
            {hijriDate}
          </Text>
          <Text style={{color: "white"}}>
            "So when the Qur'an is recited, <Text style={{fontWeight: "bold", fontSize: 30}}>then listen to it & pay attention</Text> that you may receive mercy."
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Murattal Al-Qur'an</Text>
          <Text style={styles.label}>Choose Surah</Text>
          <SurahPicker
            selectedSurah={selectedSurah}
            setSelectedSurah={setSelectedSurah}
          />
          {selectedSurah && (
            <>
              <Text style={styles.label}>Choose Qari'</Text>
              <ReciterPicker
                reciters={reciters}
                selectedReciter={selectedReciter}
                setSelectedReciter={setSelectedReciter}
              />
            </>
          )}
          {selectedReciter && (
            <>
              <Text style={styles.label}>Choose Moshaf</Text>
              <MoshafRadio
                reciters={reciters}
                selectedReciter={selectedReciter}
                selectedMoshaf={selectedMoshaf}
                setSelectedMoshaf={setSelectedMoshaf}
              />
            </>
          )}
          {selectedMoshaf && (
            <>
              <AudioControls
                isPlaying={isPlaying}
                isPaused={isPaused}
                playAudio={playAudio}
                pauseAudio={pauseAudio}
                stopAudio={stopAudio}
              />
              <DownloadButton
                audioUrl={audioUrl}
                downloadProgress={downloadProgress}
                setDownloadProgress={setDownloadProgress}
                setDownloading={setDownloading}
              />
              {downloading && (
                <ProgressBar downloadProgress={downloadProgress} />
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green"
  },
  headContainer : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  mainContainer: {
    flex: 3,
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    padding: 16,
  },
  dateStyle: {
    color: "yellow",
    textDecorationLine: "underline",
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
});

export default Index;
