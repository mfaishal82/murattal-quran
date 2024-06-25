import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { MaterialIcons } from '@expo/vector-icons';
import { surahDetails } from '../scripts/surahDetails';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [reciters, setReciters] = useState<any[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<string | null>(null);
  const [selectedReciter, setSelectedReciter] = useState<number | null>(null);
  const [selectedMoshaf, setSelectedMoshaf] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.mp3quran.net/api/v3/reciters');
        setReciters(response.data.reciters);
        setLoading(false);
      } catch (error) {
        console.error(error);
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

  const playAudio = async () => {
    if (!selectedSurah || !selectedReciter || !selectedMoshaf) return;

    if (sound && isPaused) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    const reciter = reciters.find(r => r.id === selectedReciter);
    const moshaf = reciter?.moshaf.find((m: { id: string }) => m.id === selectedMoshaf);
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
      console.error('Error loading audio', error);
      Alert.alert('Error', "Maaf audio Qari' ini tidak tersedia. Silahkan coba Qari' lain.");
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

  const surahOptions = surahDetails.map((surah) => {
    const label = `${surah.number}. ${surah.name} {${surah.juz.join(', ')}}`;
    return (
      <Picker.Item key={surah.number} label={label} value={surah.number} />
    );
  });

  const reciterOptions = reciters.map((reciter) => (
    <Picker.Item key={reciter.id} label={reciter.name} value={reciter.id} />
  ));

  const moshafOptions = selectedReciter
    ? reciters.find(r => r.id === selectedReciter).moshaf.map((moshaf: any) => ({
        label: moshaf.name,
        value: moshaf.id
      }))
    : [];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Murattal Al-Qur'an</Text>
        <Text style={styles.label}>Choose Surah</Text>
        <Picker
          selectedValue={selectedSurah}
          onValueChange={(itemValue) => setSelectedSurah(itemValue)}
          style={styles.picker}
        >
          {surahOptions}
        </Picker>
        {selectedSurah && (
          <>
            <Text style={styles.label}>Choose Qari'</Text>
            <Picker
              selectedValue={selectedReciter}
              onValueChange={(itemValue) => setSelectedReciter(itemValue)}
              style={styles.picker}
            >
              {reciterOptions}
            </Picker>
          </>
        )}
        {selectedReciter && (
          <>
            <Text style={styles.label}>Choose Moshaf</Text>
            <RadioForm
              radio_props={moshafOptions}
              initial={-1}
              onPress={(value) => setSelectedMoshaf(value)}
              buttonColor={'#2E7D32'}
              // selectedButtonColor={'#2E7D32'}
              // labelStyle={styles.radioLabel}
            />
          </>
        )}
        {selectedMoshaf && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={playAudio} disabled={isPlaying} style={styles.iconButton}>
              <MaterialIcons name="play-arrow" size={24} color={isPlaying ? "#aaa" : "#4CAF50"} />
              <Text style={[styles.buttonText, { color: isPlaying ? "#aaa" : "#4CAF50" }]}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseAudio} disabled={!isPlaying} style={styles.iconButton}>
              <MaterialIcons name="pause" size={24} color={!isPlaying ? "#aaa" : "#FFC107"} />
              <Text style={[styles.buttonText, { color: !isPlaying ? "#aaa" : "#FFC107" }]}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopAudio} disabled={!isPlaying && !isPaused} style={styles.iconButton}>
              <MaterialIcons name="stop" size={24} color={(!isPlaying && !isPaused) ? "#aaa" : "#D32F2F"} />
              <Text style={[styles.buttonText, { color: (!isPlaying && !isPaused) ? "#aaa" : "#D32F2F" }]}>Stop</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E7D32',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3E4A59',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    color: '#3E4A59',
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Index;