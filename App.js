import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Vibration,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import LoadingOverlay from './components/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownSelect from './components/DropdownSelect';
import SeekableProgressBar from './components/SeekableProgressBar';
import AudioPlayerControls from './components/AudioPlayerControls';
import AudioPlayerContainer from './components/AudioPlayerContainer';
import SelectionCard from './components/SelectionCard';
import ReciterSelection from './components/ReciterSelection';
import MoshafSelection from './components/MoshafSelection';
import SurahSelection from './components/SurahSelection';
import LanguageToggle from './components/LanguageToggle';
import DrawerMenu from './components/DrawerMenu';
import FavoritesModal from './components/FavoritesModal';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { getSurahName } from './constants/translations';

function MainApp() {
  const { t, isRTL, currentLanguage } = useLanguage();
  const [reciters, setReciters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioLoading, setAudioLoading] = useState(false);

  // Step-by-step selection states
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [selectedMoshaf, setSelectedMoshaf] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(null);

  // Dropdown states
  const [showReciterDropdown, setShowReciterDropdown] = useState(false);
  const [showMoshafDropdown, setShowMoshafDropdown] = useState(false);
  const [showSurahDropdown, setShowSurahDropdown] = useState(false);

  // Audio states
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // Drawer states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFavoritesModalVisible, setIsFavoritesModalVisible] = useState(false);

  useEffect(() => {
    fetchReciters();
    setupAudio();
    loadFavorites();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const setupAudio = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  const fetchReciters = async () => {
    try {
      const response = await fetch('https://www.mp3quran.net/api/v3/reciters');
      const data = await response.json();
      setReciters(data.reciters || []);
    } catch (error) {
      Alert.alert(t('errorTitle'), t('errorLoadingReciters'));
      console.error('Error fetching reciters:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetSelection = () => {
    setSelectedReciter(null);
    setSelectedMoshaf(null);
    setSelectedSurah(null);
    setShowReciterDropdown(false);
    setShowMoshafDropdown(false);
    setShowSurahDropdown(false);
    if (sound) {
      sound.unloadAsync();
    }
    setIsPlaying(false);
  };

  const navigateToPreviousSurah = async () => {
    if (!selectedMoshaf || !selectedSurah) return;

    const availableSurahs = selectedMoshaf.surah_list.split(',').map(num => parseInt(num));
    const currentIndex = availableSurahs.indexOf(selectedSurah.number);

    if (currentIndex > 0) {
      const previousSurahNumber = availableSurahs[currentIndex - 1];
      const previousSurahName = getSurahName(previousSurahNumber, currentLanguage);

      // Stop current audio
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
      }

      setSelectedSurah({ number: previousSurahNumber, name: previousSurahName });
    }
  };

  const navigateToNextSurah = async () => {
    if (!selectedMoshaf || !selectedSurah) return;

    const availableSurahs = selectedMoshaf.surah_list.split(',').map(num => parseInt(num));
    const currentIndex = availableSurahs.indexOf(selectedSurah.number);

    if (currentIndex < availableSurahs.length - 1) {
      const nextSurahNumber = availableSurahs[currentIndex + 1];
      const nextSurahName = getSurahName(nextSurahNumber, currentLanguage);

      // Stop current audio
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
      }

      setSelectedSurah({ number: nextSurahNumber, name: nextSurahName });
    }
  };

  const getCurrentSurahIndex = () => {
    if (!selectedMoshaf || !selectedSurah) return -1;
    const availableSurahs = selectedMoshaf.surah_list.split(',').map(num => parseInt(num));
    return availableSurahs.indexOf(selectedSurah.number);
  };

  const getTotalSurahs = () => {
    if (!selectedMoshaf) return 0;
    return selectedMoshaf.surah_list.split(',').length;
  };

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Drawer handlers
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleOpenFavorites = () => {
    setIsDrawerOpen(false);
    setIsFavoritesModalVisible(true);
  };

  const handlePlayFavorite = async (favoriteKey) => {
    // Parse favorite key: reciterId_moshafId_surahNumber
    const [reciterId, moshafId, surahNumber] = favoriteKey.split('_');

    // Find the reciter
    const reciter = reciters.find(r => r.id === parseInt(reciterId));
    if (!reciter) return;

    // Find the moshaf
    const moshaf = reciter.moshaf.find(m => m.id === parseInt(moshafId));
    if (!moshaf) return;

    // Set up the selection
    const surahName = getSurahName(parseInt(surahNumber), currentLanguage);

    setSelectedReciter(reciter);
    setSelectedMoshaf(moshaf);
    setSelectedSurah({ number: parseInt(surahNumber), name: surahName });

    // Close the favorites modal
    setIsFavoritesModalVisible(false);

    // Auto-play after a short delay to allow state to update
    setTimeout(() => {
      playAudio();
    }, 100);
  };

  const handleRemoveFavorite = (favoriteKey) => {
    const newFavorites = favorites.filter(f => f !== favoriteKey);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = () => {
    if (!selectedReciter || !selectedMoshaf || !selectedSurah) return;

    const favoriteKey = `${selectedReciter.id}_${selectedMoshaf.id}_${selectedSurah.number}`;
    const isFavorite = favorites.includes(favoriteKey);

    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(f => f !== favoriteKey);
    } else {
      newFavorites = [...favorites, favoriteKey];
    }

    saveFavorites(newFavorites);
    Vibration.vibrate(50);
  };

  const isFavorite = () => {
    if (!selectedReciter || !selectedMoshaf || !selectedSurah) return false;
    const favoriteKey = `${selectedReciter.id}_${selectedMoshaf.id}_${selectedSurah.number}`;
    return favorites.includes(favoriteKey);
  };

  const stopAudio = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.setPositionAsync(0);
        setIsPlaying(false);
        setPosition(0);
        // Don't reset duration as it's needed for the progress bar to show correctly
        // Force a state update to ensure UI reflects the reset
        setTimeout(() => {
          setPosition(0);
        }, 100);
      } catch (error) {
        console.error('Error stopping audio:', error);
        setIsPlaying(false);
        setPosition(0);
      }
    }
  };

  const seekToPosition = async (newPosition) => {
    if (sound && duration > 0) {
      try {
        await sound.setPositionAsync(newPosition * 1000);
        setPosition(newPosition);
      } catch (error) {
        console.error('Error seeking:', error);
      }
    }
  };

  // Combined Selection Component
  const renderAllSelections = () => {
    return (
      <View style={styles.allSelectionsContainer}>
        <ReciterSelection
          selectedReciter={selectedReciter}
          reciters={reciters}
          showDropdown={showReciterDropdown}
          onToggleDropdown={() => setShowReciterDropdown(!showReciterDropdown)}
          onSelect={handleReciterSelect}
        />

        <MoshafSelection
          selectedReciter={selectedReciter}
          selectedMoshaf={selectedMoshaf}
          showDropdown={showMoshafDropdown}
          onToggleDropdown={() => setShowMoshafDropdown(!showMoshafDropdown)}
          onSelect={handleMoshafSelect}
        />

        <SurahSelection
          selectedMoshaf={selectedMoshaf}
          selectedSurah={selectedSurah}
          showDropdown={showSurahDropdown}
          onToggleDropdown={() => setShowSurahDropdown(!showSurahDropdown)}
          onSelect={handleSurahSelect}
        />

        {/* Audio Player - Show only when all selections are complete */}
        {selectedReciter && selectedMoshaf && selectedSurah && (
          <AudioPlayerContainer
            selectedSurah={selectedSurah}
            selectedReciter={selectedReciter}
            selectedMoshaf={selectedMoshaf}
            isPlaying={isPlaying}
            position={position}
            duration={duration}
            sound={sound}
            onFavoriteToggle={toggleFavorite}
            isFavorite={isFavorite()}
            onPrevious={navigateToPreviousSurah}
            onPlayPause={sound ? togglePlayPause : playAudio}
            onNext={navigateToNextSurah}
            onStop={stopAudio}
            onSeek={seekToPosition}
            canGoPrevious={getCurrentSurahIndex() > 0}
            canGoNext={getCurrentSurahIndex() < getTotalSurahs() - 1}
          />
        )}
      </View>
    );
  };

  const handleReciterSelect = async (reciter) => {
    console.log('🎤 Reciter selected:', reciter.name);

    // Stop current audio if playing
    if (sound) {
      try {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }

    setSelectedReciter(reciter);
    setSelectedMoshaf(null);
    setSelectedSurah(null);
    setShowReciterDropdown(false);
  };

  const handleMoshafSelect = async (moshaf) => {
    console.log('📖 Moshaf selected:', moshaf.name);

    // Stop current audio if playing
    if (sound) {
      try {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }

    setSelectedMoshaf(moshaf);
    setSelectedSurah(null);
    setShowMoshafDropdown(false);
  };

  const handleSurahSelect = async (surah) => {
    console.log('📜 Surah selected:', surah.name, 'Number:', surah.number);

    // Stop current audio if playing
    if (sound) {
      try {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setPosition(0);
        setDuration(0);
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
    }

    setSelectedSurah(surah);
    setShowSurahDropdown(false);
  };

  const formatSurahNumber = (number) => {
    return number.toString().padStart(3, '0');
  };

  const playAudio = async () => {
    console.log('🎵 Play Audio called');
    console.log('Selected Reciter:', selectedReciter?.name);
    console.log('Selected Moshaf:', selectedMoshaf?.name);
    console.log('Selected Surah:', selectedSurah?.name, selectedSurah?.number);

    if (!selectedReciter || !selectedMoshaf || !selectedSurah) {
      console.log('❌ Missing selection:', { selectedReciter: !!selectedReciter, selectedMoshaf: !!selectedMoshaf, selectedSurah: !!selectedSurah });
      return;
    }

    try {
      setAudioLoading(true);
      Vibration.vibrate(50);

      if (sound) {
        await sound.unloadAsync();
      }

      const audioUrl = `${selectedMoshaf.server}${formatSurahNumber(selectedSurah.number)}.mp3`;
      console.log('🔗 Audio URL:', audioUrl);

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, isLooping: false }
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis / 1000);
          setDuration(status.durationMillis / 1000);
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      Alert.alert(t('errorTitle'), t('errorPlayingAudio'));
      console.error('Error playing audio:', error);
    } finally {
      setAudioLoading(false);
    }
  };

  const togglePlayPause = async () => {
    console.log('⏯️ Toggle play/pause called, isPlaying:', isPlaying, 'hasSound:', !!sound);
    if (!sound) {
      console.log('❌ No sound object available');
      return;
    }

    try {
      if (isPlaying) {
        console.log('⏸️ Pausing audio');
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log('▶️ Resuming audio');
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const EmptySearchComponent = () => (
    <View style={styles.emptySearchContainer}>
      <Ionicons name="search-outline" size={50} color="rgba(255, 255, 255, 0.5)" />
      <Text style={styles.emptySearchTitle}>لم يتم العثور على نتائج</Text>
      <Text style={styles.emptySearchSubtitle}>
        جرب البحث باسم القارئ أو جزء منه
      </Text>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={[styles.loadingText, isRTL && styles.rtlText]}>{t('loadingReciters')}</Text>
        <Text style={[styles.loadingSubText, isRTL && styles.rtlText]}>{t('loadingSubtext')}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298', '#6366f1']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={toggleDrawer}>
            <Ionicons name="book" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={[styles.headerContent, isRTL && styles.rtlAlign]}>
            <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>{t('appTitle')}</Text>
            <Text style={[styles.headerSubtitle, isRTL && styles.rtlText]}>{t('appSubtitle')}</Text>
          </View>
        </View>

        {/* All Selections in One View */}
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderAllSelections()}
        </ScrollView>

        {/* Loading Overlay */}
        <LoadingOverlay
          visible={audioLoading}
          message={t('loadingAudio')}
        />

        {/* Drawer Menu */}
        <DrawerMenu
          visible={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpenFavorites={handleOpenFavorites}
        />

        {/* Favorites Modal */}
        <FavoritesModal
          visible={isFavoritesModalVisible}
          onClose={() => setIsFavoritesModalVisible(false)}
          favorites={favorites}
          reciters={reciters}
          onPlayFavorite={handlePlayFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '600',
  },
  loadingSubText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 13,
    marginTop: 11,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'right',
    fontWeight: '500',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    textAlign: 'right',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    elevation: 3,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  reciterCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  mainCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activeCard: {
    backgroundColor: '#f8faff',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reciterAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    boxShadow: '0px 2px 4px rgba(99, 102, 241, 0.3)',
    elevation: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  reciterInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  reciterName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'right',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  surahCount: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
    marginRight: 4,
    fontWeight: '500',
  },
  recitationType: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  playingText: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '700',
    fontWeight: '600',
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    gap: 6,
  },
  surahListButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  actionButtonText: {
    fontSize: 13,
    color: '#4A90E2',
    fontWeight: '600',
  },
  playActionButton: {
    backgroundColor: '#4A90E2',
  },
  pauseButton: {
    backgroundColor: '#e74c3c',
  },
  playButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  emptySearchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptySearchTitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySearchSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },

  // Wizard styles
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeStep: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  stepNumber: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeStepNumber: {
    color: '#fff',
  },
  progressLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 8,
  },
  activeProgressLine: {
    backgroundColor: '#4A90E2',
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  stepLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  allSelectionsContainer: {
    flex: 1,
  },
  selectionSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  stepSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  selectionList: {
    paddingBottom: 20,
  },
  selectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  selectionCardText: {
    fontSize: 16,
    color: '#1e293b',
    textAlign: 'right',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  selectionCardSubtext: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 4,
    fontWeight: '500',
  },
  audioPlayerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(20px)',
  },
  selectionSummary: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  summarySubText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#6366f1',
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 6,
    boxShadow: '0px 4px 8px rgba(99, 102, 241, 0.3)',
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    elevation: 3,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.15)',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 4,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
    boxShadow: '0px 0px 2px rgba(255, 255, 255, 0.5)',
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginLeft: -7,
    elevation: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    minWidth: 35,
    textAlign: 'center',
    fontWeight: '600',
    textShadow: '0px 1px 1px rgba(0, 0, 0, 0.3)',
  },

  // Dropdown styles
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    elevation: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  dropdownButtonDisabled: {
    backgroundColor: '#f8fafc',
    opacity: 0.6,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  dropdownPlaceholderText: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  dropdownButtonTextDisabled: {
    color: '#cbd5e1',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: '80%',
    elevation: 8,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#fafbfc',
  },
  dropdownHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  dropdownList: {
    maxHeight: 400,
  },
  dropdownOption: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  optionTitle: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 20,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 2,
    fontWeight: '500',
  },
  moshafIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(99, 102, 241, 0.3)',
    elevation: 3,
  },
  surahNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  selectionConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  confirmText: {
    color: '#059669',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  backButtonText: {
    color: '#6366f1',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '700',
  },

  // RTL Support styles
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlAlign: {
    alignItems: 'flex-end',
  },
});

// Main App wrapper with Language Provider
export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
