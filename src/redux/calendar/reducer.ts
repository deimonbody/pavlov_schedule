import { ActionReducerMapBuilder, isAnyOf } from '@reduxjs/toolkit';
import { IInitialState } from './common';
import {
  setNewYearAndMonthAction,
  nextMonth,
  prevMonth,
  setDays,
  deleteIdeaAction,
  editIdeaAction,
  addNewIdea,
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
    .addMatcher(
      isAnyOf(deleteIdeaAction.fulfilled, editIdeaAction.fulfilled, setDays.fulfilled, addNewIdea.fulfilled),
      (state, actions) => {
        state.days = actions.payload;
      }
    );
};
