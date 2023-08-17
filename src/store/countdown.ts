import {useSelector} from 'react-redux';
import {Vibration} from 'react-native';

import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {pad} from '../utils/string';
import {storeMuteState} from './storage';
import {MINUTE} from '../utils/time';
import {startSound, stopSound} from './sound';

const TASK_INTERVAL_LENGTH = 15;

export enum MuteState {
  Sound,
  Mute,
  Vibrate,
}

interface DateProps {
  interval: number;
  day: number;
  month: number;
  year: number;
  date: string;
  hour: number;
  minute: number;
  quarter: number;
  remainingSeconds: number;
}

interface CountdownState extends DateProps {
  intervalLength: number;
  isChiming: boolean;
  isVibrating: boolean;
  muteState: MuteState;
}

const updateDateProps = (intervalLength: number): DateProps => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const currentMinute = now.getMinutes();
  const remainingMinutes = intervalLength - (currentMinute % intervalLength);
  const remainingSeconds =
    (remainingMinutes - 1) * MINUTE + (MINUTE - now.getSeconds());

  return {
    interval: Math.ceil(now.getMinutes() / intervalLength),
    day,
    month,
    year,
    date: `${year}-${pad(month)}-${pad(day)}`,
    hour: now.getHours(),
    minute: now.getMinutes(),
    quarter: Math.floor(now.getMinutes() / 15) + 1,
    remainingSeconds: Math.floor(remainingSeconds),
  };
};

const initialState: CountdownState = {
  intervalLength: TASK_INTERVAL_LENGTH,
  isChiming: false,
  isVibrating: false,
  muteState: MuteState.Mute,
  ...updateDateProps(TASK_INTERVAL_LENGTH),
};

export const slice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    cycleMuteState: state => {
      switch (state.muteState) {
        case MuteState.Sound:
          state.muteState = MuteState.Mute;
          break;
        case MuteState.Mute:
          state.muteState = MuteState.Vibrate;
          Vibration.vibrate();
          break;
        default:
          state.muteState = MuteState.Sound;
      }
      state.isChiming = false;
      state.isVibrating = false;
      storeMuteState(state.muteState);
    },
    setMuteState: (state, action) => {
      state.muteState = action.payload;
    },
    startAlarm: state => {
      if (state.muteState === MuteState.Sound) {
        startSound();
        state.isChiming = true;
      } else if (state.muteState === MuteState.Vibrate) {
        Vibration.vibrate();
        state.isVibrating = true;
      }
    },
    stopAlarm: state => {
      if (state.muteState === MuteState.Sound) {
        stopSound();
        state.isChiming = false;
      } else if (state.muteState === MuteState.Vibrate) {
        Vibration.cancel();
        state.isVibrating = false;
      }
    },
    update: state => {
      if (state.isVibrating) {
        Vibration.vibrate();
      }

      let {isChiming, isVibrating} = state;
      if (state.remainingSeconds === 1) {
        if (state.muteState === MuteState.Sound) {
          startSound();
          isChiming = true;
        }
        if (state.muteState === MuteState.Vibrate) {
          Vibration.vibrate();
          isVibrating = true;
        }
      }

      return {
        ...state,
        isChiming,
        isVibrating,
        ...updateDateProps(state.intervalLength),
      };
    },
  },
});

export const {cycleMuteState, setMuteState, startAlarm, stopAlarm, update} =
  slice.actions;

const selectCountdownState = (state: RootState) => state.countdown;
export const useCountdownState = () => useSelector(selectCountdownState);

const selectDate = (state: RootState) => state.countdown.date;
export const useDate = () => useSelector(selectDate);

const selectYear = (state: RootState) => state.countdown.year;
export const useYear = () => useSelector(selectYear);

const selectMonth = (state: RootState) => state.countdown.month;
export const useMonth = () => useSelector(selectMonth);

const selectDay = (state: RootState) => state.countdown.day;
export const useDay = () => useSelector(selectDay);

const selectHour = (state: RootState) => state.countdown.hour;
export const useHour = () => useSelector(selectHour);

const selectMinute = (state: RootState) => state.countdown.minute;
export const useMinute = () => useSelector(selectMinute);

const selectQuarter = (state: RootState) => state.countdown.quarter;
export const useQuarter = () => useSelector(selectQuarter);

const selectIntervalLength = (state: RootState) =>
  state.countdown.intervalLength;
export const useIntervalLength = () => useSelector(selectIntervalLength);

const selectIsChiming = (state: RootState) => state.countdown.isChiming;
export const useIsChiming = () => useSelector(selectIsChiming);

const selectIsVibrating = (state: RootState) => state.countdown.isVibrating;
export const useIsVibrating = () => useSelector(selectIsVibrating);

const selectMuteState = (state: RootState) => state.countdown.muteState;
export const useMuteState = () => useSelector(selectMuteState);

const selectRemainingSeconds = (state: RootState) =>
  state.countdown.remainingSeconds;
export const useRemainingSeconds = () => useSelector(selectRemainingSeconds);

export const reducer = slice.reducer;
