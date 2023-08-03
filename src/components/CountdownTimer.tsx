import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {CountdownCircleTimer} from './CountdownCircleTimer';
import {MINUTE} from '../utils/time';
import {pad} from '../utils/string';
import {
  startChime,
  update as updateCountdown,
  useCountdownState,
} from '../store/countdown';
import {useTinkerBell} from '../hooks/use-tinker-bell';

const formatRemainingTime = (remainingTime: number) => {
  const minutes = Math.floor(remainingTime / MINUTE);
  const seconds = remainingTime % MINUTE;
  return `${pad(minutes)}:${pad(seconds)}`;
};

const formatTime = (hour: number, minute: number, meridiem: string) => {
  hour = hour > 12 ? hour - 12 : hour;
  return `${hour === 0 ? '12' : hour}:${pad(minute)} ${meridiem}`;
};

const formatWindow = (hour: number, meridiem: string) => {
  hour = hour > 12 ? hour - 12 : hour;
  return `${hour === 0 ? '12' : hour} - ${hour + 1} ${meridiem}`;
};

const formatDate = (month: number, day: number, year: number) => {
  return `${month}/${day}/${year}`;
};

const getSecondsRemainingInInterval = (intervalLength: number) => {
  const now = new Date();
  const currentMinute = now.getMinutes();
  // Calculate the number of minutes left in the current quarter-hour
  const remainingMinutes = intervalLength - (currentMinute % intervalLength);
  return (remainingMinutes - 1) * MINUTE + (MINUTE - now.getSeconds());
};

export const CountdownTimer: React.FC = () => {
  const dispatch = useDispatch();
  const {start, stop} = useTinkerBell();
  const {intervalLength, isChiming, month, day, year, hour, minute, meridiem} =
    useCountdownState();

  useEffect(() => (isChiming ? start() : stop()), [start, stop, isChiming]);

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        duration={intervalLength * MINUTE}
        initialRemainingTime={getSecondsRemainingInInterval(intervalLength)}
        colors={Colors.timer}
        rotation="counterclockwise"
        strokeLinecap="round"
        onComplete={() => {
          dispatch(updateCountdown());
          dispatch(startChime());
          return {shouldRepeat: true};
        }}
        onUpdate={() => dispatch(updateCountdown())}>
        {({remainingTime}: any) => (
          <>
            <Text style={styles.remainingTime}>
              {formatRemainingTime(remainingTime)}
            </Text>
            <Text style={styles.time}>
              {formatTime(hour, minute, meridiem)}
            </Text>
          </>
        )}
      </CountdownCircleTimer>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formatDate(month, day, year)}</Text>
        <Text style={styles.intervalWindow}>
          {formatWindow(hour, meridiem)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    paddingBottom: 10,
    position: 'relative',
    width: '100%',
  },
  remainingTime: {
    color: Colors.timer,
    fontSize: 30,
    fontWeight: '600',
  },
  time: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'relative',
    top: 10,
  },
  dateContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlign: 'right',
    alignContent: 'flex-end',
    backgroundColor: 'red',
  },
  date: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'absolute',
    left: 10,
  },
  intervalWindow: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'absolute',
    right: 10,
    width: 120,
    textAlign: 'right',
  },
});
