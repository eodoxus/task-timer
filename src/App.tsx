import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {Tasks} from './components';
import {CountdownTimer, Controls} from './components';
import {setBubbles, setCurrentTasks} from './store/tasks';
import {
  retrieveBubbles,
  retrieveCurrentTasks,
  retrieveMuteState,
} from './store/storage';
import {setMuteState} from './store/countdown';
import {releaseSound} from './store/sound';

// Initialize theme
Colors.loadColors({
  timer: '#2584ff',
  filledBubble: '#0052cc',
  quarterLine: '#0052cc',
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const bubbles = await retrieveBubbles();
      const currentTasks = await retrieveCurrentTasks();
      const muteState = await retrieveMuteState();
      dispatch(setBubbles(bubbles));
      dispatch(setCurrentTasks(currentTasks));
      dispatch(setMuteState(muteState));
    })();

    return () => {
      releaseSound();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <CountdownTimer />
      <Tasks />
      <Controls />
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
