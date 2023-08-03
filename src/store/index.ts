import {configureStore} from '@reduxjs/toolkit';
import {reducer as countdownReducer} from './countdown';
import {reducer as tasksReducer} from './tasks';

export const store = configureStore({
  reducer: {
    countdown: countdownReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
