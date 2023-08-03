import {useSelector} from 'react-redux';

import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import {pad} from '../utils/string';

const TASK_INTERVAL_LENGTH = 15;

interface DateProps {
  interval: number;
  day: number;
  month: number;
  year: number;
  date: string;
  hour: number;
  minute: number;
  quarter: number;
  isPm: boolean;
  meridiem: string;
}

interface CountdownState extends DateProps {
  intervalLength: number;
  isChiming: boolean;
  isMuted: boolean;
}

const updateDateProps = (intervalLength: number): DateProps => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
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
    isPm,
    meridiem: isPm ? 'PM' : 'AM',
  };
};

const initialState: CountdownState = {
  intervalLength: TASK_INTERVAL_LENGTH,
  isChiming: false,
  isMuted: false,
  ...updateDateProps(TASK_INTERVAL_LENGTH),
};

export const slice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    mute: state => {
      state.isMuted = true;
      state.isChiming = false;
    },
    unmute: state => {
      state.isMuted = false;
    },
    startChime: state => {
      if (state.isMuted) {
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

export const {mute, unmute, startChime, stopChime, update} = slice.actions;

const selectCountdownState = (state: RootState) => state.countdown;
export const useCountdownState = () => useSelector(selectCountdownState);

export const selectIntervalLength = (state: RootState) =>
  state.countdown.intervalLength;

export const selectDate = (state: RootState) => state.countdown.date;

export const selectHour = (state: RootState) => state.countdown.hour;

export const selectMinute = (state: RootState) => state.countdown.minute;

export const reducer = slice.reducer;
