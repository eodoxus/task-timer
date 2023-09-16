import {useRef, useEffect} from 'react';
import {AppState} from 'react-native';

export const useAppBackgrounded = onAppBackgrounded => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|active/) &&
        nextAppState === 'background'
      ) {
        onAppBackgrounded();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [onAppBackgrounded]);
};
