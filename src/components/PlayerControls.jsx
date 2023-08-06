import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {Button} from './Button';
import {PlaybackError} from './PlaybackError';
import {mute, unmute, useIsMuted} from '../store/countdown';
import {useTinkerBell} from '../hooks/use-tinker-bell';
import {Colors} from 'react-native-ui-lib';

export const PlayerControls = () => {
  const {error} = useTinkerBell();
  const isMuted = useIsMuted();
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.row}>
        <Button
          title={isMuted ? 'Unmute' : 'Mute'}
          onPress={() => dispatch(isMuted ? unmute() : mute())}
          type="primary"
          style={styles.playPause}
        />
      </View>
      <PlaybackError error={error} />
    </>
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
