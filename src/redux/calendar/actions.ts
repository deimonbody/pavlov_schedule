import { createAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { getDaysOfMonth } from '@/helpers/getDaysOfMonth';
import { IIdea } from '@/types';

import { CalendarService } from '@/services/Calendar.service';
import { CalendarActions } from './common';

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

export const setDays = createAction(
  CalendarActions.SET_DAYS,
  (currentYear: number, currentMonth: number, countOfDays: number) => {
    const days = getDaysOfMonth(currentYear, currentMonth, countOfDays);
    return {
      payload: {
        days,
      },
    };
  }
);

export const addNewIdea = createAction(
  CalendarActions.ADD_NEW_IDEA,
  (newIdea: IIdea, currentYear: number, currentMonth: number) => {
    const dataOfIdea = dayjs(newIdea.dayFormat, 'DD/MM/YYYY');

    const yearOfIdea = dataOfIdea.year();
    const monthOfIdea = dataOfIdea.month();
    CalendarService.addNewIdea(newIdea, dataOfIdea, yearOfIdea, monthOfIdea);

    if (currentYear === yearOfIdea && currentMonth === monthOfIdea) {
      return {
        payload: { newIdea },
      };
    }
    return { payload: null };
  }
);

export const editIdeaAction = createAction(CalendarActions.EDIT_IDEA, (editIdea: IIdea) => {
  CalendarService.editIdea(editIdea);

  return {
    payload: { editIdea },
  };
});

export const deleteIdeaAction = createAction(CalendarActions.DELETE_IDEA, (id: string) => {
  CalendarService.deleteIdea(id);
  return {
    payload: { id },
  };
});
