import React, { useState } from 'react';
import { View, Text, PanResponder, Dimensions, StyleSheet } from 'react-native';

const SeekableProgressBar = ({ position, duration, onSeek }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [tempPosition, setTempPosition] = useState(0);
  
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      setIsDragging(true);
      const { locationX } = event.nativeEvent;
      const progressBarWidth = Dimensions.get('window').width - 120; // Adjust for padding
      const newPosition = Math.max(0, Math.min(duration, (locationX / progressBarWidth) * duration));
      setTempPosition(newPosition);
    },
    onPanResponderMove: (event) => {
      const { locationX } = event.nativeEvent;
      const progressBarWidth = Dimensions.get('window').width - 120;
      const newPosition = Math.max(0, Math.min(duration, (locationX / progressBarWidth) * duration));
      setTempPosition(newPosition);
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      onSeek(tempPosition);
    },
  });

  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return '0:00';
    return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
  };

  const currentPos = isDragging ? tempPosition : (position || 0);
  const progressPercentage = duration > 0 ? (currentPos / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(currentPos)}</Text>
      <View style={styles.progressBar} {...panResponder.panHandlers}>
        <View 
          style={[styles.progressFill, { width: `${progressPercentage}%` }]} 
        />
        {duration > 0 && (
          <View style={[styles.progressThumb, { left: `${Math.max(0, Math.min(100, progressPercentage))}%` }]} />
        )}
      </View>
      <Text style={styles.timeText}>{formatTime(duration)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default SeekableProgressBar;