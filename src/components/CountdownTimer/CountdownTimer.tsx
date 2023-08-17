import React, {useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Colors, Text, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {CountdownCircle} from './CountdownCircle';
import {MINUTE, SECOND, getMeridiem} from '../../utils/time';
import {pad} from '../../utils/string';
import {
  MuteState,
  cycleMuteState,
  update as updateCountdown,
  useMuteState,
  useHour,
  useMinute,
  useIntervalLength,
  useRemainingSeconds,
  stopAlarm,
} from '../../store/countdown';
import {Volume} from './MuteState/Volume';
import {Muted} from './MuteState/Muted';
import {Vibrate} from './MuteState/Vibrate';

const formatRemainingSeconds = (remainingTime: number) => {
  const minutes = Math.floor(remainingTime / MINUTE);
  const seconds = remainingTime % MINUTE;
  return `${pad(minutes)}:${pad(seconds)}`;
};

const formatTime = (hour: number, minute: number) => {
  const meridiem = getMeridiem(hour);
  hour = hour > 12 ? hour - 12 : hour;
  return `${hour === 0 ? '12' : hour}:${pad(minute)} ${meridiem}`;
};

export const CountdownTimer: React.FC = () => {
  const dispatch = useDispatch();
  const hour = useHour();
  const minute = useMinute();
  const intervalLength = useIntervalLength();
  const remainingSeconds = useRemainingSeconds();
  const muteState = useMuteState();

  const handlePress = () => {
    dispatch(stopAlarm());
    dispatch(cycleMuteState());
  };

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
          remainingTime={remainingSeconds}
          colors={Colors.timer}
          rotation="counterclockwise"
          strokeLinecap="round"
          size={150}
          onComplete={() => {
            return {shouldRepeat: true};
          }}>
          {() => (
            <>
              <Text style={styles.remainingTime}>
                {formatRemainingSeconds(remainingSeconds)}
              </Text>
              <Text style={styles.time}>{formatTime(hour, minute)}</Text>
            </>
          )}
        </CountdownCircle>
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
    position: 'relative',
    width: '100%',
  },
  remainingTime: {
    color: Colors.timer,
    fontSize: 25,
    fontWeight: '600',
    top: -10,
  },
  time: {
    color: Colors.$textNeutralLight,
    fontSize: 16,
    position: 'relative',
    top: -4,
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
});
