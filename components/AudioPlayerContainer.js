import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioPlayerControls from './AudioPlayerControls';
import SeekableProgressBar from './SeekableProgressBar';
import { useLanguage } from '../contexts/LanguageContext';

const AudioPlayerContainer = ({
  selectedSurah,
  selectedReciter,
  selectedMoshaf,
  isPlaying,
  position,
  duration,
  sound,
  onFavoriteToggle,
  isFavorite,
  onPrevious,
  onPlayPause,
  onNext,
  onStop,
  onSeek,
  canGoPrevious,
  canGoNext
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.selectionSummary}>
        <Text style={[styles.summaryTitle, isRTL && styles.rtlText]}>{t('nowPlaying')}</Text>
        <Text style={styles.summaryText}>
          {selectedSurah.name} - {selectedReciter.name}
        </Text>
        <Text style={styles.summarySubText}>{selectedMoshaf.name}</Text>
      </View>
      
      <AudioPlayerControls
        onFavoriteToggle={onFavoriteToggle}
        isFavorite={isFavorite}
        onPrevious={onPrevious}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onStop={onStop}
        isPlaying={isPlaying}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        hasSound={!!sound}
      />

      <SeekableProgressBar
        position={position}
        duration={duration}
        onSeek={onSeek}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  
  // RTL Support
  rtlText: {
    textAlign: 'center', // Keep center for this one since it's a header
    writingDirection: 'rtl',
  },
});

export default AudioPlayerContainer;