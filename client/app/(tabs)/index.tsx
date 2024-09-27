import React, { useState, useEffect, useRef } from "react";
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
import SurahPicker from "../../components/SurahPicker";
import ReciterPicker from "../../components/ReciterPicker";
import MoshafRadio from "../../components/MoshafRadio";
import AudioControls from "../../components/AudioControls";
import DownloadButton from "../../components/DownloadButton";
import ProgressBar from "../../components/ProgressBar";
import Slider from '@react-native-community/slider';
import moment from "moment-hijri";
import { Dimensions } from "react-native";
// import tw from 'tailwind-react-native-classnames';

const toArabicNumbers = (num: string): string => {
  const arabicDigits: { [key: string]: string } = {
    "0": "٠",
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
  };
  return num.replace(/[0-9]/g, (d) => arabicDigits[d]);
};

const { width } = Dimensions.get("window");

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
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const positionRef = useRef(0);
  const [hijriDate, setHijriDate] = useState<string>("");

  const handleReciterChange = (reciterId: number | null) => {
    setSelectedReciter(reciterId);
    if (reciterId !== null) {
      const reciter = reciters.find((r) => r.id === reciterId);
      if (reciter && reciter.moshaf.length > 0) {
        setSelectedMoshaf(reciter.moshaf[0].id); // Mengatur Moshaf pertama sebagai default
      } else {
        setSelectedMoshaf(null);
      }
    } else {
      setSelectedMoshaf(null);
    }
  };

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
    const hijriDate = moment().format("iD iMMMM iYYYY");
    const arabicDate = hijriDate.split(" ").map(toArabicNumbers).join(" ");
    setHijriDate(arabicDate);
  }, []);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          // Opsi lain yang mungkin Anda perlukan:
          playThroughEarpieceAndroid: false,
          // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
          playsInSilentModeIOS: true,
        });
      } catch (error) {
        console.error("Error setting audio mode", error);
      }
    };

    setupAudio();

  }, []); 

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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

      // Start updating position every 100ms
      const intervalId = setInterval(async () => {
        if (newSound) {
          const status = await newSound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis);
          }
        }
      }, 100);

      // Clear interval when audio finishes
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          clearInterval(intervalId);
        }
      });

    } catch (error) {
      Alert.alert(
        "Error",
        "Maaf audio Qari' ini tidak tersedia. Silahkan coba Qari' lain."
      );
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      positionRef.current = status.positionMillis;
      setDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
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

  const seekAudio = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const audioUrl = `${
    reciters
      .find((r) => r.id === selectedReciter)
      ?.moshaf.find((m: { id: string }) => m.id === selectedMoshaf)?.server
  }${selectedSurah}.mp3`;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Text style={styles.hijriDateStyle}>{hijriDate}</Text>
          <Text style={styles.quoteText}>
            "So when the Qur'an is recited,{" "}
            <Text style={styles.quoteHighlight}>
              then listen to it & pay attention
            </Text>{" "}
            that you may receive mercy."
          </Text>
        </View>
        {loading && <ActivityIndicator size="large" color="#2E7D32" />}
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
                setSelectedReciter={handleReciterChange}
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
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onValueChange={(value) => setPosition(value)}
                onSlidingComplete={seekAudio}
                minimumTrackTintColor="#1E8449"
                maximumTrackTintColor="#000000"
              />
              <View style={styles.timeContainer}>
                <Text>{formatTime(position)}</Text>
                <Text>{formatTime(duration)}</Text>
              </View>
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
                isDisabled={true}
              />
              {downloading && (
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progress,
                      { width: `${downloadProgress * 100}%` },
                    ]}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const formatTime = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${(Number(seconds) < 10 ? '0' : '')}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E8449"
  },
  headContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#F5F5F5",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  hijriDateStyle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  quoteText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  quoteHighlight: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFD700",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#1E8449",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#34495E",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button: {
    backgroundColor: "#1E8449",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    width: width - 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginTop: 10,
  },
  progress: {
    height: 10,
    backgroundColor: "#1E8449",
    borderRadius: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Index;
