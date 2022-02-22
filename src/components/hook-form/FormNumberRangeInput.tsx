import AppNumberRangeInput, {
  AppNumberRangeInputProps
} from '@/components/ui/AppNumberRangeInput';
import useErrorMessage from '@/hooks/useErrorMessage';
import { FormInput } from '@/shared/type';
import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Optional } from 'utility-types';

export type FormNumberRangeInputProps = Optional<
  AppNumberRangeInputProps,
  'onChange' | 'value' | 'onAdd' | 'onMinus'
> &
  FormInput;

const FormNumberRangeInput = ({
  name,
  msgLabel,
  label,
  ...props
}: FormNumberRangeInputProps) => {
  const { control, setValue } = useFormContext();

  const errorMessage = useErrorMessage({
    name,
    msgLabel: msgLabel || label
  });

  return (
    <Controller
      name={name}
      control={control}
      defaultValue="0" // to fix changing from uncontrolled input to controlled input
      render={({ field: { value, onChange } }) => (
        <FormControl error={!!errorMessage}>
          {label && <FormLabel>{label}</FormLabel>}
          <AppNumberRangeInput
            value={value}
            onChange={onChange}
            onAdd={(_value) => setValue(name, _value)}
            onMinus={(_value) => setValue(name, _value)}
            {...props}
          />
          {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default FormNumberRangeInput;
