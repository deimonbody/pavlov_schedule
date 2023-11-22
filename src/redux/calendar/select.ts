import { getMonth } from '@/helpers/getMonth';
import { RootState } from '@/redux/hooks';
import { IIdea } from '@/types';

export const selectCurrentMonth = (state: RootState) => state.calendarReducer.currentMonth;
export const selectCurrentYear = (state: RootState) => state.calendarReducer.currentYear;
export const selectCurrentCountOfDays = (state: RootState) => state.calendarReducer.countOfDays;
export const selectCurrentMonthName = (state: RootState) => getMonth(state.calendarReducer.currentMonth);
export const selectDaysOfMonth = (state: RootState) => state.calendarReducer.days;
export const selectCurrentDate = (state: RootState) => state.calendarReducer.currentDate;
export const selectIdeaById = (state: RootState, id: string | null) => {
  if (id) {
    const ideas: IIdea[] = [];
    state.calendarReducer.days.forEach((day) => ideas.push(...day.ideas));
    return ideas.find((idea) => idea.id === id) as IIdea;
  }
  return null;
};
