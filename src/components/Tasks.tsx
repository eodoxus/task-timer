import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';

import {Task} from './Task';
import {useTasks} from '../store/tasks';

export const Tasks: React.FC = () => {
  const tasks = useTasks();

  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.map(({title, slot}) => (
          <Task key={`task-${slot}`} title={title} slot={slot} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '59%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    backgroundColor: Colors.$backgroundNeutralLight,
  },
});
