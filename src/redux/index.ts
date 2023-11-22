import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { calendarReducer } from '@/redux/calendar';

export const reducer = combineReducers({
  calendarReducer,
});

export const store = configureStore({
  reducer,
});
