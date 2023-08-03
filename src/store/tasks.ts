import {useSelector} from 'react-redux';

import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '.';

import data from '../assets/resources/data.json';

export interface Interval {
  id?: number;
  date: string;
  hour: number;
  quarter: number;
}

export interface Task {
  id?: number;
  slot?: number;
  name: string;
  intervals: Interval[];
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: data.tasks,
};

export const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addInterval: (state, action) => {
      const {task, date, hour, quarter} = action.payload;
      state.tasks[task.id].intervals.push({
        date,
        hour,
        quarter,
      });
      return state;
    },
    addTask: (state, action) => {
      const {task} = action.payload;
      state.tasks[task.id] = task;
    },
    removeTask: (state, action) => {
      const {task} = action.payload;
      state.tasks[task.id] = task;
    },
    toggleInterval: (state, action) => {
      const {date, hour, quarter, slot} = action.payload;
      let task = state.tasks[slot];
      if (!task) {
        task = {name: '', intervals: []};
      }
      const intervalIdx = task.intervals.findIndex(
        ti => ti.date === date && ti.hour === hour && ti.quarter === quarter,
      );
      if (intervalIdx !== -1) {
        task.intervals.splice(intervalIdx, 1);
      } else {
        task.intervals.push({date, hour, quarter});
      }
      state.tasks[slot] = task;
      return state;
    },
    update: state => {
      return state;
    },
    updateTask: (state, action) => {
      const {task} = action.payload;
      state.tasks[task.id] = task;
    },
  },
});

export const {
  addInterval,
  addTask,
  removeTask,
  toggleInterval,
  update,
  updateTask,
} = slice.actions;

const selectTasksState = (state: RootState) => state.tasks;
export const useTasksState = () => useSelector(selectTasksState);

export const useTasks = () => useTasksState().tasks;

export const reducer = slice.reducer;
