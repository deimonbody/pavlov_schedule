import { ICalendarDay } from '@/types';

export interface IInitialState {
  currentMonth: number;
  currentYear: number;
  countOfDays: number;
  currentDate: string;
  days: ICalendarDay[];
}

export enum CalendarActions {
  NEXT_MONTH = 'nextMonth',
  PREV_MONTH = 'previousMonth',
  SET_NEW_YEAR_MONTH = 'setNewYearMonth',
  SET_DAYS = 'setDays',
  ADD_NEW_IDEA = 'addNewIdea',
  EDIT_IDEA = 'editIdea',
  DELETE_IDEA = 'deleteIdea',
}
