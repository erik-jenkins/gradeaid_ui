import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import assignmentsReducer from '../components/Assignment/assignmentsSlice';
import categoriesReducer from '../components/Category/categoriesSlice';
import coursesReducer from '../components/Course/coursesSlice';
import critsReducer from '../components/Crit/critsSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    assignments: assignmentsReducer,
    categories: categoriesReducer,
    crits: critsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
