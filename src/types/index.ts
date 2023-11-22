import dayjs from 'dayjs';

export interface ICalendarDay {
  dayNumber: number;
  dayOfWeek: string;
  fullDate: string;
  ideas: IIdea[];
}

export interface IIdea {
  id: string;
  dayFormat: string;
  time: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILocalStorageDays {
  year: number;
  month: number;
  days: ICalendarDay[];
}

export enum LocalStorageKeys {
  filters = 'filters',
  DAYS = 'days',
}

export interface IFormProps {
  title: string;
  description: string;
  date: dayjs.Dayjs;
  time: dayjs.Dayjs;
}

export interface ILocalStorageFilters {
  date: string;
}
