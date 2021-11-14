import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useErrorMessage from '../../hooks/useErrorMessage';
import { FormInput } from '../../shared/type';
import AppFileInput, { AppFileInputProps } from '../ui/AppFileInput';

export type FormFileInputProps = AppFileInputProps & FormInput;

const FormFileInput = ({
  name,
  msgLabel,
  required,
  ...props
}: FormFileInputProps) => {
  const { control, setValue } = useFormContext();

  const errorMessage = useErrorMessage({
    name,
    msgLabel: msgLabel || props.label
  });

  return (
    <Controller
      name={name}
      control={control}
      // defaultValue="" // to fix changing from uncontrolled input to controlled input
      render={({ field: { value } }) => (
        <AppFileInput
          helperText={errorMessage}
          error={!!errorMessage}
          fileValue={value}
          {...props}
          fileInputProps={{
            onChange: (e) => setValue(name, e.target.files),
            ...props.fileInputProps
          }}
          InputLabelProps={{
            required,
            ...props.InputLabelProps
          }}
        />
      )}
    />
  );
};

export default FormFileInput;
