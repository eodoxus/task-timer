import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {Tasks} from './components';
import {CountdownTimer, PlayerControls} from './components';
import {setBubbles, setCurrentTasks} from './store/tasks';
import {retrieveBubbles, retrieveCurrentTasks} from './store/storage';

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
      dispatch(setBubbles(bubbles));
      dispatch(setCurrentTasks(currentTasks));
    })();
  }, [dispatch]);

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
