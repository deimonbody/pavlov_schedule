import dayjs from 'dayjs';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Button } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import { FormContainer } from '@/components/styled';
import Input from '@/components/shared/Input';
import { addNewFormSchema } from '@/constants/schemas';
import { IFormProps, IIdea } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNewIdea } from '@/redux/calendar/actions';
import { selectCurrentCountOfDays, selectCurrentMonth, selectCurrentYear } from '@/redux/calendar/select';

interface IProps {
  closeModal: () => void;
}

const Form: React.FC<IProps> = ({ closeModal }) => {
  const currentYear = useAppSelector(selectCurrentYear);
  const currentMonth = useAppSelector(selectCurrentMonth);
  const countOfDays = useAppSelector(selectCurrentCountOfDays);
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IFormProps>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      date: dayjs(),
      time: dayjs(),
    },
    resolver: joiResolver(addNewFormSchema),
  });

  const saveHandler = (data: IFormProps) => {
    const newIdea: IIdea = {
      id: uuidv4(),
      time: data.time.format('HH:mm'),
      title: data.title,
      description: data.description,
      dayFormat: data.date.format('DD/MM/YYYY'),
      createdAt: dayjs().format('DD.MM.YYYY HH:mm'),
      updatedAt: dayjs().format('DD.MM.YYYY HH:mm'),
    };

    dispatch(addNewIdea({ newIdea, currentMonth, currentYear, countOfDays }));

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
      <Button variant="contained" onClick={handleSubmit(saveHandler)}>
        Save
      </Button>
    </FormContainer>
  );
};

export default Form;
