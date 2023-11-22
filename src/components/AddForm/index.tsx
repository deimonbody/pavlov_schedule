import { Modal } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContainer, ModalHeader, ModalTitle } from '@/components/styled';
import Form from './components/Form';

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const AddForm: React.FC<IProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Add new idea item</ModalTitle>
          <div onClick={handleClose}>
            <CloseIcon sx={{ cursor: 'pointer' }} />
          </div>
        </ModalHeader>
        <Form closeModal={handleClose} />
      </ModalContainer>
    </Modal>
  );
};

export default AddForm;
