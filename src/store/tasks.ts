import {useSelector} from 'react-redux';
import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '.';
import {
  makeFindBubble as findBubble,
  makeFindTask as findTask,
  generateId,
} from '../utils/tasks';
import {storeBubbles, storeTasks} from './storage';
import Bubble from '../components/Task/Bubble';

export interface Bubble {
  id: number;
  slot: number;
  date: string;
  hour: number;
  quarter: number;
}

interface Task {
  id: number;
  title: string;
  slot: number;
  date: string;
}

interface BubblesState {
  bubbles: Bubble[];
  tasks: Task[];
}

const initialState: BubblesState = {
  bubbles: [],
  tasks: [],
};

export const slice = createSlice({
  name: 'bubbles',
  initialState,
  reducers: {
    createBubble: (state, action) => {
      const bubble = {
        id: generateId(),
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
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    upsertTask: (state, action) => {
      const {title} = action.payload;
      const task = findTask(state.tasks)(action.payload);
      if (task) {
        task.title = title;
      } else {
        state.tasks.push({
          id: generateId(),
          ...action.payload,
        });
      }

      storeTasks(state.tasks);
    },
  },
});

export const {createBubble, deleteBubble, setBubbles, setTasks, upsertTask} =
  slice.actions;

const selectTasksState = (state: RootState) => state.tasks;
export const useTasksState = () => useSelector(selectTasksState);

const selectBubbles = (state: RootState) => state.tasks.bubbles;
export const useBubbles = () => useSelector(selectBubbles);

export const useBubble = ({
  date,
  hour,
  slot,
  quarter,
}: {
  date: string;
  hour: number;
  slot: number;
  quarter: number;
}) => {
  const bubbles = useBubbles();
  return findBubble(bubbles)({date, hour, slot, quarter});
};

const selectTasks = (state: RootState) => state.tasks.tasks;
export const useTasks = () => useSelector(selectTasks);

export const useTask = (date: string, slot: number) => {
  const tasks = useTasks();
  return tasks.find(t => t.date === date && t.slot === slot);
};

export const reducer = slice.reducer;
