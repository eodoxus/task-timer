import React from 'react';
import {Appearance, StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {useData, useFillBubbleNotification} from './hooks';

import {CountdownTimer} from './components';
import {NavigatorView} from './components';
import {DEFAULT_SCHEME, schemes, useTheme} from './lib/theme';

// Initialize theme
Colors.loadColors(schemes[Appearance.getColorScheme() || DEFAULT_SCHEME]);

const App: React.FC = () => {
  useData();
  useFillBubbleNotification();
  useTheme();

  return (
    <View style={styles.container}>
      <CountdownTimer />
      <NavigatorView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
});

export default App;
