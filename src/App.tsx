import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {Tasks} from './components';
import {CountdownTimer, PlayerControls} from './components';

// Initialize theme
Colors.loadColors({
  timer: '#2584ff',
  filledBubble: '#0052cc',
  quarterLine: '#0052cc',
});

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <CountdownTimer />
      <Tasks />
      <PlayerControls />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.$backgroundNeutral,
    paddingTop: 60,
  },
});

export default App;
