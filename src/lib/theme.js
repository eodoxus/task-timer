import {useRef} from 'react';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native-ui-lib';

export const DEFAULT_SCHEME = 'light';

export const schemes = {
  dark: {
    background: '#000',
    bubbleEmpty: '#222',
    bubbleFilled: '#0052cc',
    bubbleOutline: '#444',
    button: '#666',
    disabledButton: '#333',
    navigatorBackground: '#111',
    navigatorBorder: '#444',
    textInfo: Colors.$textNeutralLight,
    textTask: '#eee',
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

export const useTheme = () => {
  const scheme = useColorScheme();
  const schemeRef = useRef(scheme);
  if (schemeRef.current !== scheme) {
    schemeRef.current = scheme;
    Colors.loadColors(schemes[scheme || DEFAULT_SCHEME]);
  }
};
