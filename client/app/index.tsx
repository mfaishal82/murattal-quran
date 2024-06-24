import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
// import SurahDetail from '@surahName.js';

const surahDetails = [
  { number: '001', name: "Al-Fatihah", juz: [1] },
  { number: '002', name: "Al-Baqarah", juz: [1, 2, 3] },
  { number: '003', name: "Ali 'Imran", juz: [3, 4] },
  { number: '004', name: "An-Nisa", juz: [4, 5, 6] },
  { number: '005', name: "Al-Ma'idah", juz: [6, 7] },
  { number: '006', name: "Al-An'am", juz: [7, 8] },
  { number: '007', name: "Al-A'raf", juz: [8, 9] },
  { number: '008', name: "Al-Anfal", juz: [9, 10] },
  { number: '009', name: "At-Tawbah", juz: [10, 11] },
  { number: '010', name: "Yunus", juz: [11] },
  { number: '011', name: "Hud", juz: [11, 12] },
  { number: '012', name: "Yusuf", juz: [12, 13] },
  { number: '013', name: "Ar-Ra'd", juz: [13] },
  { number: '014', name: "Ibrahim", juz: [13] },
  { number: '015', name: "Al-Hijr", juz: [14] },
  { number: '016', name: "An-Nahl", juz: [14] },
  { number: '017', name: "Al-Isra", juz: [15] },
  { number: '018', name: "Al-Kahf", juz: [15, 16] },
  { number: '019', name: "Maryam", juz: [16] },
  { number: '020', name: "Tha-Ha", juz: [16, 17] },
  { number: '021', name: "Al-Anbiya", juz: [17] },
  { number: '022', name: "Al-Hajj", juz: [17, 18] },
  { number: '023', name: "Al-Mu'minun", juz: [18] },
  { number: '024', name: "An-Nur", juz: [18, 19] },
  { number: '025', name: "Al-Furqan", juz: [19] },
  { number: '026', name: "Ash-Shu'ara", juz: [19, 20] },
  { number: '027', name: "An-Naml", juz: [20] },
  { number: '028', name: "Al-Qasas", juz: [20] },
  { number: '029', name: "Al-Ankabut", juz: [21] },
  { number: '030', name: "Ar-Rum", juz: [21] },
  { number: '031', name: "Luqman", juz: [21] },
  { number: '032', name: "As-Sajda", juz: [21] },
  { number: '033', name: "Al-Ahzab", juz: [21, 22] },
  { number: '034', name: "Saba", juz: [22] },
  { number: '035', name: "Fatir", juz: [22] },
  { number: '036', name: "Ya-Sin", juz: [22, 23] },
  { number: '037', name: "As-Saffat", juz: [23] },
  { number: '038', name: "Sad", juz: [23] },
  { number: '039', name: "Az-Zumar", juz: [23, 24] },
  { number: '040', name: "Ghafir", juz: [24] },
  { number: '041', name: "Fussilat", juz: [24, 25] },
  { number: '042', name: "Ash-Shura", juz: [25] },
  { number: '043', name: "Az-Zukhruf", juz: [25] },
  { number: '044', name: "Ad-Dukhan", juz: [25] },
  { number: '045', name: "Al-Jathiya", juz: [25] },
  { number: '046', name: "Al-Ahqaf", juz: [26] },
  { number: '047', name: "Muhammad", juz: [26] },
  { number: '048', name: "Al-Fath", juz: [26] },
  { number: '049', name: "Al-Hujurat", juz: [26] },
  { number: '050', name: "Qaf", juz: [26] },
  { number: '051', name: "Adh-Dhariyat", juz: [26, 27] },
  { number: '052', name: "At-Tur", juz: [27] },
  { number: '053', name: "An-Najm", juz: [27] },
  { number: '054', name: "Al-Qamar", juz: [27] },
  { number: '055', name: "Ar-Rahman", juz: [27] },
  { number: '056', name: "Al-Waqia", juz: [27] },
  { number: '057', name: "Al-Hadid", juz: [27] },
  { number: '058', name: "Al-Mujadila", juz: [28] },
  { number: '059', name: "Al-Hashr", juz: [28] },
  { number: '060', name: "Al-Mumtahina", juz: [28] },
  { number: '061', name: "As-Saff", juz: [28] },
  { number: '062', name: "Al-Jumu'a", juz: [28] },
  { number: '063', name: "Al-Munafiqun", juz: [28] },
  { number: '064', name: "At-Taghabun", juz: [28] },
  { number: '065', name: "At-Talaq", juz: [28] },
  { number: '066', name: "At-Tahrim", juz: [28] },
  { number: '067', name: "Al-Mulk", juz: [29] },
  { number: '068', name: "Al-Qalam", juz: [29] },
  { number: '069', name: "Al-Haqqah", juz: [29] },
  { number: '070', name: "Al-Ma'arij", juz: [29] },
  { number: '071', name: "Nuh", juz: [29] },
  { number: '072', name: "Al-Jinn", juz: [29] },
  { number: '073', name: "Al-Muzzammil", juz: [29] },
  { number: '074', name: "Al-Muddathir", juz: [29] },
  { number: '075', name: "Al-Qiyama", juz: [29] },
  { number: '076', name: "Al-Insan", juz: [29] },
  { number: '077', name: "Al-Mursalat", juz: [29] },
  { number: '078', name: "An-Naba", juz: [30] },
  { number: '079', name: "An-Nazi'at", juz: [30] },
  { number: '080', name: "Abasa", juz: [30] },
  { number: '081', name: "At-Takwir", juz: [30] },
  { number: '082', name: "Al-Infitar", juz: [30] },
  { number: '083', name: "Al-Mutaffifin", juz: [30] },
  { number: '084', name: "Al-Inshiqaq", juz: [30] },
  { number: '085', name: "Al-Buruj", juz: [30] },
  { number: '086', name: "At-Tariq", juz: [30] },
  { number: '087', name: "Al-Ala", juz: [30] },
  { number: '088', name: "Al-Ghashiya", juz: [30] },
  { number: '089', name: "Al-Fajr", juz: [30] },
  { number: '090', name: "Al-Balad", juz: [30] },
  { number: '091', name: "Ash-Shams", juz: [30] },
  { number: '092', name: "Al-Lail", juz: [30] },
  { number: '093', name: "Ad-Duhaa", juz: [30] },
  { number: '094', name: "Ash-Sharh", juz: [30] },
  { number: '095', name: "At-Tin", juz: [30] },
  { number: '096', name: "Al-Alaq", juz: [30] },
  { number: '097', name: "Al-Qadr", juz: [30] },
  { number: '098', name: "Al-Bayyina", juz: [30] },
  { number: '099', name: "Az-Zalzala", juz: [30] },
  { number: '100', name: "Al-Adiyat", juz: [30] },
  { number: '101', name: "Al-Qaria", juz: [30] },
  { number: '102', name: "At-Takathur", juz: [30] },
  { number: '103', name: "Al-Asr", juz: [30] },
  { number: '104', name: "Al-Humaza", juz: [30] },
  { number: '105', name: "Al-Fil", juz: [30] },
  { number: '106', name: "Quraish", juz: [30] },
  { number: '107', name: "Al-Ma'un", juz: [30] },
  { number: '108', name: "Al-Kautsar", juz: [30] },
  { number: '109', name: "Al-Kafiroon", juz: [30] },
  { number: '110', name: "An-Nasr", juz: [30] },
  { number: '111', name: "Al-Masad", juz: [30] },
  { number: '112', name: "Al-Ikhlas", juz: [30] },
  { number: '113', name: "Al-Falaq", juz: [30] },
  { number: '114', name: "An-Nas", juz: [30] }
];

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [reciters, setReciters] = useState<any[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<string>('001');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.mp3quran.net/api/v3/reciters');
        console.log('Reciters data:', response.data.reciters);
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

  const playAudio = async (server: string) => {
    const audioUrl = `${server}${selectedSurah}.mp3`;

    console.log('Audio URL:', audioUrl);

    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error loading audio', error);
      Alert.alert('Error', "Maaf audio Qari' ini tidak tersedia. Silahkan coba Qari lain.");
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const surahOptions = surahDetails.map((surah) => {
    const label = `${surah.number}. ${surah.name} {${surah.juz.join(', ')}}`;
    return (
      <Picker.Item key={surah.number} label={label} value={surah.number} />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Murattal Al-Qur'an</Text>
      <Text>Pilih Surat</Text>
      <Picker
        selectedValue={selectedSurah}
        onValueChange={(itemValue) => setSelectedSurah(itemValue)}
        style={styles.picker}
      >
        {surahOptions}
      </Picker>
      <FlatList
        data={reciters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reciterContainer}>
            <Text style={styles.reciterName}>{item.name}</Text>
            {item.moshaf.map((moshaf: any) => (
              <View key={moshaf.id} style={styles.moshafContainer}>
                <TouchableOpacity onPress={() => playAudio(moshaf.server)}>
                  <Text style={styles.moshafName}>{moshaf.name}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  <Button title="Play" onPress={() => playAudio(moshaf.server)} disabled={isPlaying} color="#4CAF50" />
                  <Button title="Pause" onPress={pauseAudio} disabled={!isPlaying} color="#F44336" />
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#3E4A59'
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20
  },
  reciterContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2
  },
  reciterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E4A59',
    marginBottom: 8
  },
  moshafContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  moshafName: {
    fontSize: 16,
    color: '#00796B',
    textDecorationLine: 'underline'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 140
  }
});

export default Index;