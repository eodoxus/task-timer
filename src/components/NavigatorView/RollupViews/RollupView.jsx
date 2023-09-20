import {Dimensions, React, ScrollView, StyleSheet, View} from 'react-native';

import {DailyRollup} from './DailyRollup';
import {nextDate, prevDate} from '../../../utils/time';

export const RollupView = ({date}) => {
  const styles = createStyles();
  return [prevDate(date), date, nextDate(date)].map(d => (
    <ScrollView key={d}>
      <View style={styles.rollups}>
        <DailyRollup date={d} />
      </View>
    </ScrollView>
  ));
};

const createStyles = () =>
  StyleSheet.create({
    rollups: {
      width: Dimensions.get('window').width,
    },
  });
