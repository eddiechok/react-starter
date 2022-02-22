import React, { PropsWithChildren } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useErrorMessage from '../../hooks/useErrorMessage';
import { FormInput } from '../../shared/type';
import AppSelect, { AppSelectProps } from '../ui/AppSelect';

type FormSelectProps = PropsWithChildren<AppSelectProps> & FormInput;

const FormSelect = ({
  children,
  name,
  msgLabel,
  ...props
}: FormSelectProps) => {
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
          <AppSelect
            {...field}
            {...props}
            error={props.error || !!errorMessage}
            helperText={errorMessage}
            labelId={props.labelId || props.label}
          />
        );
      }}
    />
  );
};

export default FormSelect;
