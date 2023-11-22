import dayjs from 'dayjs';
import { ICalendarDay, ILocalStorageDays, LocalStorageKeys } from '@/types';

export const getDaysOfMonth = (currentYear: number, currentMonth: number, daysOfMonth: number): ICalendarDay[] => {
  const result: ICalendarDay[] = [];
  let daysFromLocalStorage: ICalendarDay[] = [];
  const localStorageData = localStorage.getItem(LocalStorageKeys.DAYS);

  if (localStorageData) {
    const dataFromLocalStorage = JSON.parse(localStorageData) as ILocalStorageDays[];
    const daysByCurrentYearAndMonth = dataFromLocalStorage.find(
      ({ year, month }) => year === currentYear && month === currentMonth
    )?.days;
    daysFromLocalStorage = daysByCurrentYearAndMonth || [];
  }

  for (let i = 1; i <= daysOfMonth; i++) {
    const date = dayjs().month(currentMonth).date(i);
    const sameElement = daysFromLocalStorage.find((el) => el.fullDate === date.format('DD/MM/YYYY'));
    if (sameElement) {
      result.push(sameElement);
    } else {
      result.push({
        dayNumber: date.date(),
        dayOfWeek: dayjs().date(date.date()).format('dd'),
        fullDate: date.format('DD/MM/YYYY'),
        ideas: [],
      });
    }
  }
  return result;
};
