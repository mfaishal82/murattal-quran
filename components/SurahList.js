import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { getSurahName } from '../constants/translations';

const SurahList = ({ visible, onClose, reciter, onPlaySurah }) => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const { currentLanguage } = useLanguage();

  const getSurahList = () => {
    if (!reciter?.moshaf?.[0]?.surah_list) return [];
    
    const surahNumbers = reciter.moshaf[0].surah_list.split(',').map(num => parseInt(num));
    return surahNumbers.map(num => ({
      number: num,
      name: getSurahName(num, currentLanguage),
    }));
  };

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.surahItem,
        selectedSurah === item.number && styles.selectedSurah
      ]}
      onPress={() => {
        setSelectedSurah(item.number);
        onPlaySurah(item.number, item.name);
      }}
    >
      <View style={styles.surahContent}>
        <Text style={styles.surahName}>{item.name}</Text>
        <View style={styles.surahNumber}>
          <Text style={styles.surahNumberText}>{item.number}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.reciterName}>{reciter?.name}</Text>
              <Text style={styles.moshafName}>{reciter?.moshaf?.[0]?.name}</Text>
            </View>
          </View>

          {/* Surah List */}
          <FlatList
            data={getSurahList()}
            renderItem={renderSurahItem}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    padding: 8,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  reciterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  moshafName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 2,
  },
  listContainer: {
    padding: 20,
  },
  surahItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    boxShadow: '0px 1px 2.22px rgba(0, 0, 0, 0.22)',
  },
  selectedSurah: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.8)',
  },
  surahContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  surahName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
  surahNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(102, 126, 234, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SurahList;