import {useSelector} from 'react-redux';

import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '.';

import data from '../assets/resources/data.json';
import {findBubble, findTask, generateId} from '../utils/tasks';
import {storeBubbles, storeCurrentTasks} from './storage';

const NUM_SLOTS = 10;

export interface Bubble {
  id: number;
  title: string;
  slot: number;
  date: string;
  hour: number;
  quarter: number;
}

interface Task {
  title: string;
  slot: number;
}

interface BubblesState {
  bubbles: Bubble[];
  currentTasks: Task[];
}

const initialState: BubblesState = {
  bubbles: [],
  currentTasks: [],
};

export const slice = createSlice({
  name: 'bubbles',
  initialState,
  reducers: {
    createBubble: (state, action) => {
      const {slot} = action.payload;
      const bubble = {
        id: generateId(),
        title: findTask(state.currentTasks)(slot)?.title || '',
        ...action.payload,
      };
      state.bubbles.push(bubble);
      storeBubbles(state.bubbles);
    },
    deleteBubble: (state, action) => {
      const {id} = action.payload;
      const bubbleIdx = state.bubbles.findIndex(b => b.id === id);
      state.bubbles.splice(bubbleIdx, 1);
      storeBubbles(state.bubbles);
    },
    setBubbles: (state, action) => {
      state.bubbles = action.payload;
    },
    setCurrentTasks: (state, action) => {
      state.currentTasks = action.payload;
    },
    setTaskTitle: (state, action) => {
      const {date, hour, slot, title} = action.payload;
      state.bubbles.forEach(b => {
        if (b.date === date && b.hour === hour && b.slot === slot) {
          b.title = title;
        }
      });

      const taskIdx = state.currentTasks.findIndex(t => t.slot === slot);
      if (taskIdx !== -1) {
        state.currentTasks[taskIdx].title = title;
      } else {
        state.currentTasks.push({title, slot});
      }

      storeCurrentTasks(state.currentTasks);
    },
  },
});

export const {
  createBubble,
  deleteBubble,
  setBubbles,
  setCurrentTasks,
  setTaskTitle,
} = slice.actions;

const selectTasksState = (state: RootState) => state.tasks;
export const useTasksState = () => useSelector(selectTasksState);

const selectBubbles = (state: RootState) => state.tasks.bubbles;
export const useBubbles = () => useSelector(selectBubbles);

export const useBubble = ({date, hour, slot, quarter}) => {
  const bubbles = useBubbles();
  return findBubble(bubbles)({date, hour, slot, quarter});
};

const selectCurrentTasks = (state: RootState) => state.tasks.currentTasks;
export const useCurrentTasks = () => useSelector(selectCurrentTasks);

export const useTasks = () => {
  const currentTasks = useCurrentTasks();
  const findOrCreateTask = (title, slot) =>
    findTask(currentTasks)(slot) || {title, slot};
  return Array(NUM_SLOTS).fill('').map(findOrCreateTask);
};

export const reducer = slice.reducer;
