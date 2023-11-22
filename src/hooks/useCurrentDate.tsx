import dayjs from 'dayjs';
import { selectCurrentDate, selectCurrentMonth, selectCurrentYear } from '@/redux/calendar/select';
import { useAppSelector } from '@/redux/hooks';
import { ICalendarDay } from '@/types';

export const useCurrentDate = (day: ICalendarDay) => {
  const currenDate = useAppSelector(selectCurrentDate);

  const currentYear = useAppSelector(selectCurrentYear);
  const currentMonth = useAppSelector(selectCurrentMonth);

  const selectedDate = dayjs().month(currentMonth).year(currentYear).date(day.dayNumber);

  return currenDate === selectedDate.format('DD/MM/YYYY');
};
