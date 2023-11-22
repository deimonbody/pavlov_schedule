import dayjs from 'dayjs';
import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { DatePicker } from '@mui/x-date-pickers';
import { CalendarDataContainer, CalendarMonthName } from '@/components/styled';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCurrentMonth, selectCurrentMonthName, selectCurrentYear } from '@/redux/calendar/select';
import { nextMonth, prevMonth, setNewYearAndMonthAction } from '@/redux/calendar/actions';

const DatePickerStyles = {
  '& .MuiInputBase-input': {
    display: 'none',
  },
  width: '40px',
  height: '40px',
  '& .MuiInputBase-root': {
    width: '40px',
    height: '40px',
    paddingRight: '0',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    padding: '0',
    width: '40px',
    height: '40px',
    top: '-3px',
  },
  '& .MuiInputAdornment-root': {
    marginLeft: '0',
    width: '40px',
    height: '40px',
    maxHeight: 'none',
  },
  '& .MuiButtonBase-root': {
    padding: '0',
    width: '40px',
    height: '40px',
  },
};

const HeaderDate: React.FC = () => {
  const currentMonth = useAppSelector(selectCurrentMonth);
  const currentYear = useAppSelector(selectCurrentYear);
  const currentMonthName = useAppSelector(selectCurrentMonthName);

  const dispatch = useAppDispatch();

  const setNewYearAndMonth = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      dispatch(setNewYearAndMonthAction(newDate));
    }
  };

  const nextMonthHandler = () => {
    dispatch(nextMonth(currentMonth, currentYear));
  };

  const prevMonthHandler = () => {
    dispatch(prevMonth(currentMonth, currentYear));
  };

  return (
    <CalendarDataContainer>
      <div onClick={prevMonthHandler}>
        <KeyboardArrowLeftIcon sx={{ cursor: 'pointer' }} />
      </div>
      {currentMonthName && currentYear && (
        <CalendarMonthName>
          {currentMonthName} - {currentYear}
        </CalendarMonthName>
      )}
      <div onClick={nextMonthHandler}>
        <KeyboardArrowRightIcon sx={{ cursor: 'pointer' }} />
      </div>
      <DatePicker onChange={setNewYearAndMonth} views={['month', 'year']} sx={DatePickerStyles} />
    </CalendarDataContainer>
  );
};

export default HeaderDate;
