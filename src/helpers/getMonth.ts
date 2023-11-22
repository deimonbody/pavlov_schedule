import dayjs from 'dayjs';

export const getMonth = (monthNumber: number): string => {
  return dayjs().month(monthNumber).format('MMMM');
};
