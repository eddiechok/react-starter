import AppImageInput, {
  AppImageInputProps
} from '@/components/ui/AppImageInput';
import { FormInput } from '@/shared/type';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormError from './FormError';

export type FormImageInputProps = AppImageInputProps & FormInput;

const FormImageInput = ({ name, msgLabel, ...props }: FormImageInputProps) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      // defaultValue="" // to fix changing from uncontrolled input to controlled input
      render={({ field: { value } }) => (
        <FormError name={name} label={props.label} msgLabel={msgLabel}>
          <AppImageInput
            fileValue={value}
            {...props}
            fileInputProps={{
              onChange: (e) => setValue(name, e.target.files?.[0]),
              ...props.fileInputProps
            }}
          />
        </FormError>
      )}
    />
  );
};

export default FormImageInput;
