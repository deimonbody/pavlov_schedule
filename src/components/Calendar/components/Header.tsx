import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { CalendarHeaderContainer, CalendarHeaderButton } from '@/components/styled';
import HeaderDate from './HeaderDate';

interface IProps {
  openModal: (modalType: 'create' | 'edit') => void;
}
const Header: React.FC<IProps> = ({ openModal }) => {
  return (
    <CalendarHeaderContainer>
      <CalendarHeaderButton variant="contained" onClick={() => openModal('create')}>
        <AddIcon />
      </CalendarHeaderButton>
      <HeaderDate />
    </CalendarHeaderContainer>
  );
};

export default Header;
