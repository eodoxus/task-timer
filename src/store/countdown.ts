import {useSelector} from 'react-redux';

import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {pad} from '../utils/string';
import {storeMuteState} from './storage';
import {MINUTE} from '../utils/time';

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
  isPm: boolean;
  meridiem: string;
}

interface CountdownState extends DateProps {
  intervalLength: number;
  isChiming: boolean;
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
  const isPm = now.getHours() >= 12;

  return {
    interval: Math.ceil(now.getMinutes() / intervalLength),
    day,
    month,
    year,
    date: `${year}-${pad(month)}-${pad(day)}`,
    hour: now.getHours(),
    minute: now.getMinutes(),
    quarter: Math.floor(now.getMinutes() / 15) + 1,
    remainingSeconds,
    isPm,
    meridiem: isPm ? 'PM' : 'AM',
  };
};

const initialState: CountdownState = {
  intervalLength: TASK_INTERVAL_LENGTH,
  isChiming: false,
  muteState: MuteState.Sound,
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
          break;
        default:
          state.muteState = MuteState.Sound;
      }
      state.isChiming = false;
      storeMuteState(state.muteState);
    },
    setMuteState: (state, action) => {
      state.muteState = action.payload;
    },
    startChime: state => {
      if (state.muteState !== MuteState.Sound) {
        return;
      }
      state.isChiming = true;
    },
    stopChime: state => {
      state.isChiming = false;
    },
    update: state => {
      return {
        ...state,
        ...updateDateProps(state.intervalLength),
      };
    },
  },
});

export const {cycleMuteState, setMuteState, startChime, stopChime, update} =
  slice.actions;

const selectCountdownState = (state: RootState) => state.countdown;
export const useCountdownState = () => useSelector(selectCountdownState);

const selectDate = (state: RootState) => state.countdown.date;
export const useDate = () => useSelector(selectDate);

const selectHour = (state: RootState) => state.countdown.hour;
export const useHour = () => useSelector(selectHour);

const selectMinute = (state: RootState) => state.countdown.minute;
export const useMinute = () => useSelector(selectMinute);

const selectQuarter = (state: RootState) => state.countdown.quarter;
export const useQuarter = () => useSelector(selectQuarter);

const selectIsChiming = (state: RootState) => state.countdown.isChiming;
export const useIsChiming = () => useSelector(selectIsChiming);

const selectMuteState = (state: RootState) => state.countdown.muteState;
export const useMuteState = () => useSelector(selectMuteState);

export const reducer = slice.reducer;
