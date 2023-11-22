import { Box, Modal } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ModalContainer, ModalHeader, ModalHeaderSubTitle, ModalTitle } from '@/components/styled';
import { useAppSelector } from '@/redux/hooks';
import { selectIdeaById } from '@/redux/calendar/select';
import Form from './components/Form';

interface IProps {
  open: boolean;
  handleClose: () => void;
  editIdeaID: string | null;
}

const EditForm: React.FC<IProps> = ({ open, handleClose, editIdeaID }) => {
  const currentIdea = useAppSelector((state) => selectIdeaById(state, editIdeaID));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <ModalHeader>
          <div>
            <ModalTitle>Edit idea item</ModalTitle>
            {currentIdea && (
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
                <ModalHeaderSubTitle>Created At{currentIdea.createdAt}</ModalHeaderSubTitle>
                <ModalHeaderSubTitle>Updated At{currentIdea.updatedAt}</ModalHeaderSubTitle>
              </Box>
            )}
          </div>
          <div onClick={handleClose}>
            <CloseIcon sx={{ cursor: 'pointer' }} />
          </div>
        </ModalHeader>
        <Form closeModal={handleClose} idea={currentIdea} />
      </ModalContainer>
    </Modal>
  );
};

export default EditForm;
