import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors, TextField, View} from 'react-native-ui-lib';

import Bubble from './Bubble';
import {useCountdownState} from '../store/countdown';

export const Task = ({task = {}, slot}) => {
  const {name} = task;
  const {date, hour, quarter: currentQuarter} = useCountdownState();

  const hasInterval = quarter =>
    task?.intervals?.find(
      ti => ti.date === date && ti.hour === hour && ti.quarter === quarter,
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.bubbles}>
        {[1, 2, 3, 4].map(quarter => (
          <Bubble
            key={`${slot}-${date}-${hour}-${quarter}`}
            isFilled={hasInterval(quarter)}
            interval={{date, hour, quarter, slot}}
            style={styles.bubble}
            showLine={quarter === currentQuarter}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    backgroundColor: Colors.$backgroundNeutralLight,
    position: 'relative,',
  },
  title: {
    fontSize: 13,
    flex: 1,
  },
  bubbles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    display: 'flex',
  },
});
