import { styled } from '@mui/material';

export const ModalContainer = styled('div')(() => ({
  backgroundColor: 'white',
  padding: '10px 20px',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '700px',
}));

export const ModalTitle = styled('p')(() => ({
  fontSize: '1.4rem',
  fontFamily: 'Montserrat-Medium',
  margin: '0',
}));

export const ModalHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const FormContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  marginTop: '20px',
}));

export const ErrorInputText = styled('span')(() => ({
  color: 'red',
  position: 'absolute',
  left: '0',
  bottom: '-20px',
  fontSize: '0.8rem',
}));

export const ModalHeaderSubTitle = styled('span')(() => ({
  fontSize: '0.8rem',
  fontFamily: 'Montserrat-Regular',
}));
