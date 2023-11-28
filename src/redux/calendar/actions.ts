import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { calendarService } from '@/services';
import { CalendarActions, ISetDaysProps, IAddNewIdeaProps, IDeleteIdeaProps, IEditIdeaProps } from './common';

export const nextMonth = createAction(CalendarActions.NEXT_MONTH, (currentMonth: number, currentYear: number) => {
  const currentDate = dayjs().month(currentMonth).year(currentYear);
  let newDate = currentDate.add(1, 'month');

  if (currentDate.month() + 1 === 12) {
    newDate = currentDate.add(1, 'year');
    newDate = newDate.month(0);
  }
  const countOfDays = dayjs().month(newDate.month()).daysInMonth();
  const year = newDate.year();
  const month = newDate.month();

  return {
    payload: {
      year,
      month,
      countOfDays,
    },
  };
});

export const prevMonth = createAction(CalendarActions.PREV_MONTH, (currentMonth: number, currentYear: number) => {
  const currentDate = dayjs().month(currentMonth).year(currentYear);
  let newDate = currentDate.subtract(1, 'month');

  if (currentDate.month() - 1 === -1) {
    newDate = currentDate.subtract(1, 'year');
    newDate = newDate.month(11);
  }
  const countOfDays = dayjs().month(newDate.month()).daysInMonth();
  const year = newDate.year();
  const month = newDate.month();

  return {
    payload: {
      year,
      month,
      countOfDays,
    },
  };
});

export const setNewYearAndMonthAction = createAction(CalendarActions.SET_NEW_YEAR_MONTH, (newDate: dayjs.Dayjs) => {
  const year = newDate.year();
  const month = newDate.month();
  const countOfDays = dayjs().month(month).daysInMonth();
  return {
    payload: {
      year,
      month,
      countOfDays,
    },
  };
});

export const setDays = createAsyncThunk(
  CalendarActions.SET_DAYS,
  async ({ countOfDays, currentMonth, currentYear }: ISetDaysProps) => {
    const days = await calendarService.getData(currentYear, currentMonth, countOfDays);
    return days;
  }
);

export const addNewIdea = createAsyncThunk(
  CalendarActions.ADD_NEW_IDEA,
  async ({ newIdea, currentMonth, currentYear, countOfDays }: IAddNewIdeaProps) => {
    const dataOfIdea = dayjs(newIdea.dayFormat, 'DD/MM/YYYY');

    const yearOfIdea = dataOfIdea.year();
    const monthOfIdea = dataOfIdea.month();
    await calendarService.addData(newIdea, dataOfIdea, yearOfIdea, monthOfIdea);

    const newDays = await calendarService.getData(currentYear, currentMonth, countOfDays);
    return newDays;
  }
);

export const editIdeaAction = createAsyncThunk(
  CalendarActions.EDIT_IDEA,
  async ({ editIdea, countOfDays, currentMonth, currentYear }: IEditIdeaProps) => {
    await calendarService.editData(editIdea);
    const newDays = await calendarService.getData(currentYear, currentMonth, countOfDays);
    return newDays;
  }
);

export const deleteIdeaAction = createAsyncThunk(
  CalendarActions.DELETE_IDEA,
  async ({ id, countOfDays, currentMonth, currentYear }: IDeleteIdeaProps) => {
    await calendarService.deleteData(id);
    const newDays = await calendarService.getData(currentYear, currentMonth, countOfDays);
    return newDays;
  }
);
