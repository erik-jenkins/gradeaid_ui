import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import assignmentsReducer from '../components/Assignment/assignmentsSlice';
import categoriesReducer from '../components/Category/categoriesSlice';
import critsReducer from '../components/Crit/critsSlice';

export const store = configureStore({
  reducer: {
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
