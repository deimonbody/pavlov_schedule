import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { getDaysOfMonth } from '@/helpers/getDaysOfMonth';
import { IInitialState } from './common';
import {
  setNewYearAndMonthAction,
  nextMonth,
  prevMonth,
  setDays,
  addNewIdea,
  editIdeaAction,
  deleteIdeaAction,
} from './actions';

export const calendarReducer = (builder: ActionReducerMapBuilder<IInitialState>) => {
  builder
    .addCase(setNewYearAndMonthAction, (state, actions) => {
      const { month, year, countOfDays } = actions.payload;

      state.currentYear = year;
      state.currentMonth = month;
      state.countOfDays = countOfDays;
    })
    .addCase(nextMonth, (state, actions) => {
      const { year, month, countOfDays } = actions.payload;

      state.countOfDays = countOfDays;
      state.currentMonth = month;
      state.currentYear = year;
    })
    .addCase(prevMonth, (state, actions) => {
      const { year, month, countOfDays } = actions.payload;

      state.countOfDays = countOfDays;
      state.currentMonth = month;
      state.currentYear = year;
    })
    .addCase(setDays, (state, actions) => {
      state.days = actions.payload.days;
    })
    .addMatcher(isAnyOf(deleteIdeaAction, addNewIdea, editIdeaAction), (state, actions) => {
      if (actions.payload) {
        state.days = getDaysOfMonth(state.currentYear, state.currentMonth, state.countOfDays);
      }
    });
};
