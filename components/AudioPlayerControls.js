import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WaveAnimation from './WaveAnimation';

const AudioPlayerControls = ({ 
  onFavoriteToggle, 
  isFavorite, 
  onPrevious, 
  onPlayPause, 
  onNext, 
  onStop, 
  isPlaying, 
  canGoPrevious, 
  canGoNext, 
  hasSound 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onFavoriteToggle}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "#ef4444" : "rgba(255, 255, 255, 0.8)"} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={onPrevious}
        disabled={!canGoPrevious}
      >
        <Ionicons 
          name="play-back" 
          size={24} 
          color={!canGoPrevious ? 'rgba(255, 255, 255, 0.4)' : '#fff'} 
        />
      </TouchableOpacity>

      <View style={styles.playButtonContainer}>
        <WaveAnimation isPlaying={isPlaying} />
        <TouchableOpacity 
          style={styles.playButton}
          onPress={onPlayPause}
        >
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={32} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={onNext}
        disabled={!canGoNext}
      >
        <Ionicons 
          name="play-forward" 
          size={24} 
          color={!canGoNext ? 'rgba(255, 255, 255, 0.4)' : '#fff'} 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onStop}
        disabled={!hasSound}
      >
        <Ionicons 
          name="stop" 
          size={24} 
          color={!hasSound ? 'rgba(255, 255, 255, 0.4)' : '#fff'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
    flexWrap: 'nowrap',
  },
  playButtonContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    minWidth: 90,
    minHeight: 80,
    flex: 0,
  },
  playButton: {
    backgroundColor: '#6366f1',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    boxShadow: '0px 4px 8px rgba(99, 102, 241, 0.3)',
    zIndex: 2,
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    marginHorizontal: 4,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    elevation: 3,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.15)',
    marginHorizontal: 3,
  },
});

export default AudioPlayerControls;