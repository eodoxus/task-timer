import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Error} from './Error';
import {Colors} from 'react-native-ui-lib';

export const Controls = () => {

  return (
    <>
      <View style={styles.row} />
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
