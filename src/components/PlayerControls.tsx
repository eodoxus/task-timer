import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Button} from './Button';
import {PlaybackError} from './PlaybackError';
import {mute, unmute, useCountdownState} from '../store/countdown';
import {useTinkerBell} from '../hooks/use-tinker-bell';
import {Colors} from 'react-native-ui-lib';

export const PlayerControls: React.FC = () => {
  const {error} = useTinkerBell();
  const {isMuted} = useCountdownState();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          title={isMuted ? 'Unmute' : 'Mute'}
          onPress={() => dispatch(isMuted ? unmute() : mute())}
          type="primary"
          style={styles.playPause}
        />
      </View>
      <PlaybackError error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  playPause: {
    width: 120,
    textAlign: 'center',
    color: Colors.timer,
  },
});
