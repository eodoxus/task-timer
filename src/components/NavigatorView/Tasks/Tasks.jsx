import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import {Task} from './Task';
import {generateRange, makeFindTask} from '../../../utils/tasks';

const NUM_TASK_SLOTS = 18;
const PAGINATION_HOUR_OFFSETS = [-1, 0, 1];

export const Tasks = ({date, hour, tasks}) => {
  const findTask = makeFindTask(tasks);

  const styles = createStyles();
  return PAGINATION_HOUR_OFFSETS.map(hourOffset => (
    <ScrollView key={hour + hourOffset}>
      <View style={styles.tasks}>
        {generateRange(NUM_TASK_SLOTS).map(slot => (
          <Task
            key={slot}
            slot={slot}
            date={date}
            hour={hour + hourOffset}
            title={findTask({date, slot})?.title || ''}
          />
        ))}
      </View>
    </ScrollView>
  ));
};

const createStyles = () =>
  StyleSheet.create({
    tasks: {
      width: Dimensions.get('window').width,
    },
  });
