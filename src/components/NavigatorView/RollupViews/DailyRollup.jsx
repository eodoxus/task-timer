import {React, StyleSheet, Text, View} from 'react-native';

import {useTaskSummariesForDay} from '../../../store/tasks';
import {Colors} from 'react-native-ui-lib';
import {pad} from '../../../utils/string';
import {HOUR, formatDayOfWeek} from '../../../utils/time';

const formatMinutes = totalMinutes => {
  const hours = Math.floor(totalMinutes / HOUR);
  const minutes = totalMinutes % HOUR;
  return `${pad(hours)}:${pad(minutes)}`;
};

export const DailyRollup = ({date}) => {
  const summaries = useTaskSummariesForDay(date);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{formatDayOfWeek(date)}</Text>
      {summaries.length === 0 && (
        <View style={styles.emptyDay}>
          <View>
            <Text>Days off sure are nice...</Text>
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
