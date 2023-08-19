import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {CountdownTimer} from './components';
import {NavigatorView} from './components';
import {setBubbles, setTasks} from './store/tasks';
import {
  retrieveBubbles,
  retrieveMuteState,
  retrieveTasks,
} from './store/storage';
import {setMuteState} from './store/countdown';
import {releaseSound} from './utils/sound';

// Initialize theme
Colors.loadColors({
  timer: '#2584ff',
  filledBubble: '#0052cc',
  quarterLine: '#0052cc',
  button: '#d9d9d9',
  disabledButton: '#eaebee',
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const bubbles = await retrieveBubbles();
      const tasks = await retrieveTasks();
      const muteState = await retrieveMuteState();
      dispatch(setBubbles(bubbles));
      dispatch(setTasks(tasks));
      dispatch(setMuteState(muteState));
    })();

    return () => {
      releaseSound();
    };
  }, [dispatch]);

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
    backgroundColor: Colors.$backgroundNeutral,
    paddingTop: 60,
  },
});

export default App;
