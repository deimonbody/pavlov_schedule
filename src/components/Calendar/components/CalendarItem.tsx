import React from 'react';
import { ICalendarDay } from '@/types';
import { CalendarItemStyled, CalendarItemHeader, CalendarIdeasContainer, CalendarIdea } from '@/components/styled';

import { useCurrentDate } from '@/hooks/useCurrentDate';

interface IProps {
  day: ICalendarDay;
  openModal: (modalType: 'create' | 'edit') => void;
  setEditIdeaID: React.Dispatch<React.SetStateAction<string | null>>;
}

const CalendarItem: React.FC<IProps> = ({ day, openModal, setEditIdeaID }) => {
  const isCurrentDate = useCurrentDate(day);

  return (
    <CalendarItemStyled isCurrentDay={isCurrentDate}>
      <CalendarItemHeader>
        <p>{day.dayNumber}</p>
        <p>{day.dayOfWeek}</p>
      </CalendarItemHeader>
      <CalendarIdeasContainer>
        {day.ideas.map((el) => (
          <CalendarIdea
            key={el.id}
            onClick={() => {
              setEditIdeaID(el.id);
              openModal('edit');
            }}
          >
            <span>{el.title}</span>
            <span>{el.time}</span>
          </CalendarIdea>
        ))}
      </CalendarIdeasContainer>
    </CalendarItemStyled>
  );
};

export default CalendarItem;
