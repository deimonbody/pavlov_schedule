import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { IInitialState } from './common';
import { calendarReducer } from './reducer';

const initialState: IInitialState = {
  currentMonth: dayjs().month(),
  currentYear: dayjs().year(),
  countOfDays: dayjs().month(dayjs().month()).daysInMonth(),
  currentDate: dayjs().format('DD/MM/YYYY'),
  days: [],
};

const { reducer } = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: calendarReducer,
});

export { reducer };
