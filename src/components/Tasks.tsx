import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {Task} from './Task';
import {useTasks} from '../store/tasks';

export const Tasks: React.FC = () => {
  const tasks = useTasks();

  return (
    <View style={styles.container}>
      {tasks.map(({title, slot}) => (
        <Task key={`task-${slot}`} title={title} slot={slot} />
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
