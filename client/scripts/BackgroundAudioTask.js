// BackgroundAudioTask.js
import * as TaskManager from 'expo-task-manager';
import { Audio } from 'expo-av';

TaskManager.defineTask('BACKGROUND_AUDIO', async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { remoteMessage } = data;
    // Handle background audio task
  }
});

export const registerBackgroundTask = async () => {
  try {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });

    await TaskManager.defineTask('BACKGROUND_AUDIO', () => {});
  } catch (error) {
    console.error('Failed to register background task', error);
  }
};
