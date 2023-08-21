import {React, StyleSheet, Text, View} from 'react-native';
import {useRef} from 'react';

import {useTaskSummariesForDay} from '../../../store/tasks';
import {Colors} from 'react-native-ui-lib';
import {pad} from '../../../utils/string';
import {HOUR, formatDayOfWeek} from '../../../utils/time';
import {useDate} from '../../../store/countdown';

const EMPTY_TAGLINES = [
  'Days off are nice!',
  'Everyone needs a rest day :)',
  `Not much happenin' today?`,
  'Sometimes one feels like a nut.',
  `You're not being lazy today are you?`,
  'Time to get busy!',
  'Nothing to see here',
  `Prolly keep it movin'`,
];

const FUTURE_TAGLINES = [
  `It's good to plan ahead`,
  'Aggressive',
  'Mom always said you were prepared',
  'Better early than never',
];

const formatMinutes = totalMinutes => {
  const hours = Math.floor(totalMinutes / HOUR);
  const minutes = totalMinutes % HOUR;
  return `${pad(hours)}:${pad(minutes)}`;
};

export const DailyRollup = ({date}) => {
  const currentDate = useDate();
  const summaries = useTaskSummariesForDay(date);
  const tagLines = date <= currentDate ? EMPTY_TAGLINES : FUTURE_TAGLINES;
  const tagLine = useRef(Math.floor(Math.random() * tagLines.length));
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{formatDayOfWeek(date)}</Text>
      {summaries.length === 0 && (
        <View style={styles.emptyDay}>
          <View>
            <Text>{tagLines[tagLine.current]}</Text>
          </View>
        </View>
      )}
      {summaries.map((s, idx) => (
        <View style={styles.summary} key={idx}>
          <View style={styles.title}>
            <Text>{s.title}</Text>
          </View>
          <View style={styles.minutes}>
            <Text>{formatMinutes(s.minutes)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 900,
    paddingLeft: 10,
  },
  emptyDay: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 100,
  },
  summary: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
  },
  title: {
    flex: 4,
  },
  minutes: {
    alignItems: 'flex-end',
    flex: 1,
  },
});
