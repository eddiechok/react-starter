import { Capacitor } from '@capacitor/core';
import { SelectProps } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AppSelect from '../ui/AppSelect';

type FormSelectProps = PropsWithChildren<SelectProps> & {
  name: string;
};

const FormSelect = ({ children, name, ...props }: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="" // to fix changing from uncontrolled input to controlled input
      render={({ field }) => {
        return (
          <AppSelect
            native={Capacitor.isNativePlatform()}
            {...field}
            {...props}
          />
        );
      }}
    />
  );
};

export default FormSelect;
