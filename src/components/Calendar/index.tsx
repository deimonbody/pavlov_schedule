import React, { useEffect, useState } from 'react';
import { CalendarContainer, CalendarTableContainer } from '@/components/styled';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectCurrentCountOfDays,
  selectCurrentMonth,
  selectCurrentYear,
  selectDaysOfMonth,
} from '@/redux/calendar/select';
import { setDays, setNewYearAndMonthAction } from '@/redux/calendar/actions';
import AddForm from '@/components/AddForm';
import EditForm from '@/components/EditForm';
import { ILocalStorageFilters, LocalStorageKeys } from '@/types';
import dayjs from 'dayjs';
import CalendarItem from './components/CalendarItem';
import Header from './components/Header';

const Calendar: React.FC = () => {
  const year = useAppSelector(selectCurrentYear);
  const month = useAppSelector(selectCurrentMonth);
  const countOfDays = useAppSelector(selectCurrentCountOfDays);
  const dispatch = useAppDispatch();
  const days = useAppSelector(selectDaysOfMonth);
  const [isOpenModal, setIsOpenModal] = useState<'create' | 'edit' | false>(false);
  const [editIdeaID, setEditIdeaID] = useState<string | null>(null);

  const openModal = (modalType: 'create' | 'edit') => setIsOpenModal(modalType);
  const closeModal = () => {
    setIsOpenModal(false);
    setEditIdeaID(null);
  };

  useEffect(() => {
    const filters = localStorage.getItem(LocalStorageKeys.filters);
    if (filters) {
      const { date } = JSON.parse(filters) as ILocalStorageFilters;
      dispatch(setNewYearAndMonthAction(dayjs(date, 'DD/MM/YYYY')));
    }
  }, []);

  useEffect(() => {
    dispatch(setDays(year, month, countOfDays));
    localStorage.setItem(
      LocalStorageKeys.filters,
      JSON.stringify({ date: dayjs().month(month).year(year).format('DD/MM/YYYY') })
    );
  }, [year, month]);

  return (
    <CalendarContainer>
      <Header openModal={openModal} />
      <CalendarTableContainer>
        {days.map((day) => (
          <CalendarItem day={day} key={day.dayNumber} openModal={openModal} setEditIdeaID={setEditIdeaID} />
        ))}
      </CalendarTableContainer>
      <AddForm open={isOpenModal === 'create'} handleClose={closeModal} />
      <EditForm open={isOpenModal === 'edit'} handleClose={closeModal} editIdeaID={editIdeaID} />
    </CalendarContainer>
  );
};

export default Calendar;
