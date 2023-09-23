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

  const styles = createStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{formatDayOfWeek(date)}</Text>
      {summaries.length === 0 && (
        <View style={styles.emptyDay}>
          <View>
            <Text style={styles.text}>{tagLines[tagLine.current]}</Text>
          </View>
        </View>
      )}
      {summaries.map((s, idx) => (
        <View style={styles.summary} key={idx}>
          <View style={styles.title}>
            <Text style={styles.text}>{s.title}</Text>
          </View>
          <View style={styles.minutes}>
            <Text style={styles.text}>{formatMinutes(s.minutes)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      color: Colors.textTask,
    },
    header: {
      fontSize: 20,
      paddingLeft: 5,
      color: Colors.textTask,
    },
    emptyDay: {
      justifyContent: 'center',
      flexDirection: 'row',
      paddingTop: 100,
      color: Colors.textTask,
    },
    summary: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: Colors.navigatorBorder,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 10,
      flexDirection: 'row',
    },
    text: {
      color: Colors.textTask,
    },
    title: {
      flex: 4,
    },
    minutes: {
      alignItems: 'flex-end',
      flex: 1,
    },
  });
