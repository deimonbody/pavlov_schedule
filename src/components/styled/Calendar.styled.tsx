import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

export const CalendarContainer = styled('div')(() => ({
  padding: '20px 40px',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

export const CalendarHeaderContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const CalendarHeaderButton = styled(Button)<ButtonProps>(() => ({
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  minWidth: '0px',
}));

export const CalendarDataContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const CalendarMonthName = styled('p')(() => ({
  fontSize: '1rem',
  fontFamily: 'Montserrat-Medium',
}));

export const CalendarTableContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridTemplateRows: 'repeat(auto-fill, 1fr)',
  marginTop: '30px',
  flexGrow: '1',
}));

export const CalendarItemStyled = styled('div')<{ isCurrentDay: boolean }>(({ isCurrentDay }) => ({
  border: '1px solid gray',
  padding: '10px 20px',
  backgroundColor: isCurrentDay ? '#116df738' : 'white',
}));

export const CalendarItemHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '0.8rem',
  fontFamily: 'Montserrat-Bold',
  marginBottom: '20px',
}));

export const CalendarIdeasContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  gap: '10px',
}));

export const CalendarIdea = styled('div')(() => ({
  backgroundColor: '#05275b',
  color: 'white',
  fontFamily: 'Montserrat-Regular',
  fontSize: '0.9rem',
  padding: '10px 15px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));
