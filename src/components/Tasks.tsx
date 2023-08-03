import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {Task} from './Task';
import {useTasks} from '../store/tasks';

const NUM_TASKS = 10;

export const Tasks: React.FC = () => {
  const tasks = useTasks();

  return (
    <View style={styles.container}>
      {Array(NUM_TASKS)
        .fill('')
        .map((_, idx) => (
          <Task key={`task-${idx}`} task={tasks[idx]} slot={idx} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '63%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    backgroundColor: Colors.$backgroundNeutralLight,
  },
});
