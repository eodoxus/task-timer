import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Error} from './Error';
import {useTinkerBell} from './CountdownTimer/useTinkerBell';
import {Colors} from 'react-native-ui-lib';

export const Controls = () => {
  const {error} = useTinkerBell();

  return (
    <>
      <View style={styles.row} />
      <Error error={error} />
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
