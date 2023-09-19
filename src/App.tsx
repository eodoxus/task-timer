import React, {useRef} from 'react';
import {Appearance, StyleSheet, useColorScheme} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {useData, useFillBubbleNotification} from './hooks';

import {CountdownTimer} from './components';
import {NavigatorView} from './components';

const defaultScheme = 'light';

const schemes = {
  dark: {
    background: '#000',
    bubbleEmpty: '#121212',
    bubbleFilled: '#0052cc',
    bubbleOutline: '#333',
    button: '#666',
    disabledButton: '#333',
    navigatorBackground: '#111',
    navigatorBorder: '#222',
    textInfo: Colors.$textNeutralLight,
    textTask: '#aaa',
    timer: '#2584ff',
  },
  light: {
    background: Colors.$backgroundNeutral,
    bubbleEmpty: Colors.$backgroundNeutral,
    bubbleFilled: '#0052cc',
    bubbleOutline: Colors.$outlineDisabled,
    button: '#d9d9d9',
    disabledButton: '#eaebee',
    navigatorBackground: Colors.$backgroundNeutralLight,
    navigatorBorder: Colors.$outlineDefault,
    textInfo: Colors.$textNeutralLight,
    textTask: Colors.$textDefault,
    timer: '#2584ff',
  },
};

// Initialize theme
Colors.loadColors(schemes[Appearance.getColorScheme() || defaultScheme]);

const App: React.FC = () => {
  const scheme = useColorScheme();
  const schemeRef = useRef(scheme);
  if (schemeRef.current !== scheme) {
    schemeRef.current = scheme;
    Colors.loadColors(schemes[scheme || defaultScheme]);
  }

  useData();
  useFillBubbleNotification();

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
