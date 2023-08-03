import {useEffect, useState} from 'react';
import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

import asset from '../assets/resources/tinker-bell.mp3';

export function useTinkerBell() {
  const [sound, setSound] = useState(null);
  const [error, setError] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isReady || isLoading) {
      return;
    }

    setIsLoading(true);

    const soundFile = new Sound(asset, err => {
      if (err) {
        setError('Failed to load the alarm sound');
      } else {
        setSound(soundFile);
        setIsReady(true);
      }
    });

    return () => {
      sound?.release();
    };
  }, [isLoading, isReady, sound]);

  return {
    error,
    isPlaying,
    isReady,
    start: () => {
      if (!isReady || isPlaying) {
        return;
      }

      setIsPlaying(true);
      sound.setNumberOfLoops(-1);
      sound.play(success => {
        if (!success) {
          return setError('playback failed due to audio decoding errors');
        }
        sound.play();
      });
    },
    stop: () => {
      if (!isReady || !isPlaying) {
        return;
      }

      setIsPlaying(false);
      sound.stop();
    },
  };
}
