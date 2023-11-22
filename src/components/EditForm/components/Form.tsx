import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import dayjs from 'dayjs';
import { Box, Button } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import { IFormProps, IIdea } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNewFormSchema } from '@/constants/schemas';
import { FormContainer } from '@/components/styled';
import Input from '@/components/shared/Input';
import { addNewIdea, deleteIdeaAction, editIdeaAction } from '@/redux/calendar/actions';
import { selectCurrentMonth, selectCurrentYear } from '@/redux/calendar/select';

interface IProps {
  idea: IIdea | null;
  closeModal: () => void;
}

const Form: React.FC<IProps> = ({ idea, closeModal }) => {
  const dispatch = useAppDispatch();
  const currentYear = useAppSelector(selectCurrentYear);
  const currentMonth = useAppSelector(selectCurrentMonth);
  const { control, handleSubmit } = useForm<IFormProps>({
    mode: 'all',
    defaultValues: {
      title: idea ? idea.title : '',
      description: idea ? idea.description : '',
      date: idea ? dayjs(idea.dayFormat, 'DD/MM/YYYY') : dayjs(),
      time: idea ? dayjs(idea.time, 'HH:mm') : dayjs(),
    },
    resolver: joiResolver(addNewFormSchema),
  });

  const saveHandler = (data: IFormProps) => {
    const newIdea: IIdea = {
      id: idea?.id as string,
      time: data.time.format('HH:mm'),
      title: data.title,
      description: data.description,
      dayFormat: data.date.format('DD/MM/YYYY'),
      createdAt: idea?.createdAt as string,
      updatedAt: dayjs().format('DD.MM.YYYY HH:mm'),
    };

    if (newIdea.dayFormat !== idea?.dayFormat) {
      dispatch(deleteIdeaAction(idea?.id as string));
      dispatch(addNewIdea(newIdea, currentYear, currentMonth));
    } else {
      dispatch(editIdeaAction(newIdea));
    }
    closeModal();
  };
  const deleteHandler = () => {
    dispatch(deleteIdeaAction(idea?.id as string));
    closeModal();
  };

  return (
    <FormContainer>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            value={value}
            onChange={onChange}
            placeholder="Title goes here"
            type="text"
            label="Title *"
            error={error}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input value={value} onChange={onChange} placeholder="" type="textarea" label="Description *" error={error} />
        )}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <DatePicker format="DD.MM.YYYY" value={value} onChange={onChange} />
          )}
        />
        <Box>
          <Controller
            control={control}
            name="time"
            render={({ field: { value, onChange } }) => <TimePicker value={value} onChange={onChange} />}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'flex-end' }}>
        <Button variant="contained" onClick={handleSubmit(saveHandler)}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={deleteHandler}>
          Delete
        </Button>
      </Box>
    </FormContainer>
  );
};

export default Form;
