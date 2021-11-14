import { TextFieldProps } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useErrorMessage from '../../hooks/useErrorMessage';
import { FormInput } from '../../shared/type';
import AppTextField from '../ui/AppTextField';

type FormTextFieldProps = TextFieldProps &
  FormInput & {
    dp?: number;
  };

const FormTextField = ({
  name,
  msgLabel,
  required,
  ...props
}: FormTextFieldProps) => {
  const { control } = useFormContext();

  const errorMessage = useErrorMessage({
    name,
    msgLabel: msgLabel || props.label
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // to fix changing from uncontrolled input to controlled input
      render={({ field }) => {
        return (
          <AppTextField
            helperText={errorMessage}
            error={!!errorMessage}
            {...field}
            {...props}
            InputLabelProps={{
              required,
              ...props.InputLabelProps
            }}
          />
        );
      }}
    />
  );
};

export default FormTextField;
