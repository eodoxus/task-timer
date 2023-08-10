import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {CountdownCircle} from './CountdownCircle';
import {MINUTE, SECOND} from '../../utils/time';
import {pad} from '../../utils/string';
import {
  MuteState,
  cycleMuteState,
  startAlarm,
  update as updateCountdown,
  useCountdownState,
  useMuteState,
} from '../../store/countdown';
import {Volume} from './MuteState/Volume';
import {Muted} from './MuteState/Muted';
import {Vibrate} from './MuteState/Vibrate';

const formatRemainingSeconds = (remainingTime: number) => {
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

export const CountdownTimer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    intervalLength,
    month,
    day,
    year,
    hour,
    minute,
    meridiem,
    remainingSeconds,
  } = useCountdownState();
  const muteState = useMuteState();

  const handlePress = () => dispatch(cycleMuteState());

  useEffect(() => {
    const interval = setInterval(() => dispatch(updateCountdown()), SECOND);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <CountdownCircle
          isPlaying
          duration={intervalLength * MINUTE}
          initialRemainingTime={remainingSeconds}
          colors={Colors.timer}
          rotation="counterclockwise"
          strokeLinecap="round"
          onComplete={() => {
            dispatch(startAlarm());
            return {shouldRepeat: true};
          }}>
          {() => (
            <>
              <Text style={styles.remainingTime}>
                {formatRemainingSeconds(remainingSeconds)}
              </Text>
              <Text style={styles.time}>
                {formatTime(hour, minute, meridiem)}
              </Text>
            </>
          )}
        </CountdownCircle>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{formatDate(month, day, year)}</Text>
          <Text style={styles.intervalWindow}>
            {formatWindow(hour, meridiem)}
          </Text>
        </View>
        <View style={styles.volumeContainer}>
          {muteState === MuteState.Sound && <Volume />}
          {muteState === MuteState.Mute && <Muted />}
          {muteState === MuteState.Vibrate && <Vibrate />}
        </View>
      </View>
    </Pressable>
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
  volumeContainer: {
    position: 'relative',
    width: 25,
    top: -45,
    left: 0,
  },
  volumeImage: {
    width: 25,
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
    left: 5,
  },
  intervalWindow: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'absolute',
    right: 5,
    width: 120,
    textAlign: 'right',
  },
});