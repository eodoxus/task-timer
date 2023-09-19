import React, {useCallback} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import Bubble from './Bubble';
import {upsertTask} from '../../../../store/tasks';

export const Task = ({title, date, hour, slot}) => {
  const dispatch = useDispatch();

  const handleOnChangeText = useCallback(
    text => {
      dispatch(upsertTask({date, slot, title: text}));
    },
    [date, dispatch, slot],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={handleOnChangeText}
        returnKeyType="done"
      />
      <View style={styles.bubbles}>
        {[1, 2, 3, 4].map(quarter => (
          <Bubble
            key={`bubble-${slot}-${quarter}`}
            style={styles.bubble}
            date={date}
            hour={hour}
            slot={slot}
            quarter={quarter}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.navigatorBorder,
    height: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: Colors.textTask,
  },
  bubbles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    display: 'flex',
  },
});
