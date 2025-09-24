import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const WaveAnimation = ({ isPlaying = false }) => {
  const wave1 = useRef(new Animated.Value(0.3)).current;
  const wave2 = useRef(new Animated.Value(0.5)).current;
  const wave3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    if (isPlaying) {
      const createAnimation = (animatedValue, delay = 0) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 600,
              delay,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0.3,
              duration: 600,
              useNativeDriver: false,
            }),
          ])
        );
      };

      const animation1 = createAnimation(wave1, 0);
      const animation2 = createAnimation(wave2, 200);
      const animation3 = createAnimation(wave3, 400);

      animation1.start();
      animation2.start();
      animation3.start();

      return () => {
        animation1.stop();
        animation2.stop();
        animation3.stop();
      };
    } else {
      wave1.setValue(0.3);
      wave2.setValue(0.5);
      wave3.setValue(0.2);
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wave,
          {
            height: wave1.interpolate({
              inputRange: [0, 1],
              outputRange: [8, 24],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            height: wave2.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 32],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            height: wave3.interpolate({
              inputRange: [0, 1],
              outputRange: [6, 20],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            height: wave1.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 28],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            height: wave2.interpolate({
              inputRange: [0, 1],
              outputRange: [5, 16],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  wave: {
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 2,
    borderRadius: 2,
    boxShadow: '0px 1px 2px rgba(99, 102, 241, 0.3)',
  },
});

export default WaveAnimation;