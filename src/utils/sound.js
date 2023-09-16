import Sound from 'react-native-sound';

import asset from '../assets/resources/tinkerBell.mp3';

// Enable playback in silence mode
Sound.setCategory('Playback');

let sound;

const onSoundLoaded = err => {
  if (err) {
    console.error('Could not load sound', err);
    return;
  }

  if (!sound) {
    console.error('Sound not initialized');
    return;
  }

  sound.setNumberOfLoops(-1);
  sound.play(success => success && sound.play());
};

export const startSound = () => {
  if (!sound) {
    sound = new Sound(asset, onSoundLoaded);
  }

  sound.play();
};

export const stopSound = () => sound?.stop();

export const releaseSound = () => sound?.release();
