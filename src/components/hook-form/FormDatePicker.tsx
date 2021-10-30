import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useErrorMessage from '../../hooks/useErrorMessage';
import { FormInput } from '../../shared/type';
import AppDatePicker, { AppDatePickerProps } from '../ui/AppDatePicker';

export type FormDatePickerProps = Omit<
  AppDatePickerProps,
  'value' | 'onChange'
> &
  FormInput;

const FormDatePicker = ({ msgLabel, name, ...props }: FormDatePickerProps) => {
  const { control } = useFormContext();

  const errorMessage = useErrorMessage({
    name,
    msgLabel: msgLabel || props.label
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AppDatePicker
          {...field}
          {...props}
          textFieldProps={{
            error: !!errorMessage,
            helperText: errorMessage,
            ...props.textFieldProps
          }}
        />
      )}
    />
  );
};

export default FormDatePicker;
