import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AudioPlayer = ({
  isPlaying,
  currentSurah,
  currentReciter,
  onPlayPause,
  onNext,
  onPrevious,
  position = 0,
  duration = 0
}) => {
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (duration > 0) {
      const progress = position / duration;
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [position, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentReciter || !currentSurah) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.9)', 'rgba(118, 75, 162, 0.9)']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* Song Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.surahName} numberOfLines={1}>
            {currentSurah}
          </Text>
          <Text style={styles.reciterName} numberOfLines={1}>
            {currentReciter.name}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={onPrevious}
          >
            <Ionicons name="play-skip-back" size={24} color="#fff" />
          </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.controlButton}
            onPress={onNext}
          >
            <Ionicons name="play-skip-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Time Display */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  gradient: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 25,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1.5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1.5,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  reciterName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AudioPlayer;
