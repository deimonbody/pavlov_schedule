import { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { FieldError } from 'react-hook-form';
import { ErrorInputText } from '@/components/styled';

interface IProps<T> {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type: 'text' | 'textarea';
  label: string;
  error: FieldError | undefined;
}

const Input = <T,>({ value, onChange, placeholder, type, label, error }: IProps<T>) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        value={value}
        onChange={(e) => onChange(e)}
        type={type}
        label={label}
        variant="standard"
        placeholder={placeholder}
        sx={{ width: '100%' }}
      />
      <ErrorInputText>{error?.message}</ErrorInputText>
    </Box>
  );
};

export default Input;
